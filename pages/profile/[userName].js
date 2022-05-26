import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import Post from "../../components/post/Post";
import Profile from "../../components/profile/Profile";
import { getUser, setAuthenticated } from "../../features/auth/authSlice";
import { supabase } from "../../utils/supabaseClient";

export const getStaticPaths = async () => {
    const { data } = await supabase
        .from('profiles')
        .select(`id,username`)

    const paths = data.map(user => ({
        params: {
            userName: user.username
        }
    }))

    return {
        paths,
        fallback: true
    }
}

export const getStaticProps = async ({ params }) => {
    const { data:profile } = await supabase
        .from('profiles')
        .select(`id, username,biography,website`)
        .eq('username', params.userName)
        .single()

    const { data:posts } = await supabase
        .from('post')
        .select(`id,description,songlink,created_at,author`)
        .eq('author', profile.id)
        .order('created_at', {ascending: false})

    return {
        props: {
            profile,
            posts
        }
    }
}

function UserPage({ profile, posts }) {
    const dispatch = useDispatch()
    const [user, setUser] = useState(supabase.auth.user() || null)

    useEffect(() => {
        if (user) {
            dispatch(setAuthenticated(true))
            dispatch(getUser())
        }
        supabase.auth.onAuthStateChange(async (event, session) => {
            setUser(supabase.auth.user() || null)
        })
    })

    return (
        <Layout
            title={profile.username}
        >
            <Profile profile={profile} />

            {
                posts?.map(post => (
                    <Post
                        key={post.id}
                        post={post}
                        username={profile.username}
                    />
                ))
            }
        </Layout>
    );
}

export default UserPage;