import Compose from "../components/post/Compose";
import Post from "../components/post/Post";
import Layout from '../components/Layout';
import { useSelector } from "react-redux";
import Link from "next/link";
import { supabase } from "../utils/supabaseClient";

export async function getStaticProps() {
    const { data, error } = await supabase
        .from('post')
        .select(`
            id,description,songlink,created_at,author,
            profiles(
                username
            )
        `)
        .order('created_at', { ascending: false })

    return {
        props: {
            posts: data
        },
        revalidate: 1,
    };
}

function HomeScreen({ posts }) {
    const { isAuthenticated } = useSelector(state => state.auth)

    return (
        <Layout
            title="Home"
        >
            <div className="home-compose">
                {
                    isAuthenticated ? (
                        <Compose />
                    ) : (
                        <div className="home-unauthenticated">
                            <p>Please <Link href="/">Login</Link> to post</p>
                        </div>
                    )
                }
            </div>

            {
                posts?.map(post => (
                    <Post
                        key={post.id}
                        post={post}
                        username={post.profiles.username}
                    />
                ))
            }

        </Layout>
    );
}

export default HomeScreen;