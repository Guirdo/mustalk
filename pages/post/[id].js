import Layout from "../../components/Layout";
import PostCard from "../../components/post/PostCard";
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
        fallback: true,
    }
}

export const getStaticProps = async ({ params }) => {
    const { data: post } = await supabase
        .from('post')
        .select(`
            id,description,songlink,
            created_at,author,
            profiles:author(username,avatar_url)
        `)
        .eq('id', params.id)
        .single()

    return {
        props: {
            post,
            profile: post.profiles,
        },
        revalidate: 1,
    }
}

function PostPage({ post, profile }) {
    return (
        <Layout
            title={`Post by ${profile?.username}`}
            description={post.description}
            author={profile?.username}
        >
            <PostCard
                key={post.id}
                post={post}
                profile={profile}
            />
        </Layout>
    );
}

export default PostPage;