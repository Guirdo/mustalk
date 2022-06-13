import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import PostCard from "../../components/post/PostCard";
import { getUser, setAuthenticated } from "../../features/auth/authSlice";
import { supabase } from "../../utils/supabaseClient";

export const getStaticPaths = async () => {
    const { data } = await supabase
        .from('post')
        .select(`id`)

    const paths = data.map(post => ({
        params: {
            id: post.id
        }
    }))

    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps = async ({ params }) => {
    const { data: post } = await supabase
        .from('post')
        .select(`
            id,description,songlink,
            created_at,author,
            profiles:author(username)
        `)
        .eq('id', params.id)
        .single()

    return {
        props: {
            post
        }
    }
}

function PostPage({ post }) {
    const dispatch = useDispatch()
    const [user, setUser] = useState(supabase.auth.user() || null)

    useEffect(() => {
        if (user) {
            dispatch(setAuthenticated(true))
            dispatch(getUser())
        }
        supabase.auth.onAuthStateChange(async () => {
            setUser(supabase.auth.user() || null)
        })
    })

    return (
        <Layout
            title={`Post by ${post.profiles.username}`}
            description={post.description}
            author={post.profiles.username}
        >
            <PostCard
                key={post.id}
                post={post}
                username={post.profiles.username}
            />
        </Layout>
    );
}

export default PostPage;