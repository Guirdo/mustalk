import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import Post from "../../components/post/Post";
import Profile from "../../components/profile/Profile";
import { getUser, setAuthenticated } from "../../features/auth/authSlice";
import { supabase } from "../../utils/supabaseClient";

export const getStaticPaths = async () => {
    //const user = supabase.auth.user()

    const { data } = await supabase
        .from('profiles')
        .select(`username`)

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
    const { data } = await supabase
        .from('profiles')
        .select(`id, username,biography,website`)
        .eq('username', params.userName)
        .single()

    const profile = JSON.stringify(data)

    return {
        props: {
            profile
        }
    }
}

function UserPage({ profile }) {
    const { username } = JSON.parse(profile)
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
            title={username}
        >

            <div className='home-main'>
                <Profile profile={profile} />

                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>

        </Layout>
    );
}

export default UserPage;