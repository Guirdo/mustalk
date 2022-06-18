import PostCard from "../../components/post/PostCard";
import PostLayout from "../../components/post/PostLayout";
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

function PostPage({ post = {}, profile= {} }) {
    return (
        <PostLayout
            slug={post.id}
            description={post.description}
            author={profile.username}
        >
            <PostCard
                key={post.id}
                post={post}
                profile={profile}
            />
        </PostLayout>
    );
}

export default PostPage;