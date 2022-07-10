import Compose from "../components/post/Compose";
import Post from "../components/post/Post";
import Layout from '../components/Layout';
import { useSelector } from "react-redux";
import Link from "next/link";
import { supabase } from "../utils/supabaseClient";
import { DownRoundArrow } from "iconoir-react";
import { useState } from "react";

export async function getStaticProps() {
    const { data: posts } = await supabase
        .from('post')
        .select(`
            id,description,songlink,
            created_at,author, reported,
            profiles:author(username,avatar_url,banned)
        `)
        .not('reported', 'eq', true)
        .order('created_at', { ascending: false })
        .range(0, 9)

    return {
        props: {
            posts
        },
        revalidate: 1,
    };
}

function HomeScreen({ posts }) {
    const { isAuthenticated } = useSelector(state => state.auth)
    const [postHome, setPostHome] = useState(posts)
    const [lastPost, setLastPost] = useState(9)
    const [disable, setDisable] = useState(false)

    const loadMorePosts = async () => {
        const { data,count } = await supabase
            .from('post')
            .select(`
                id,description,songlink,
                created_at,author, reported,
                profiles:author(username,avatar_url,banned)
            `,{count: "exact"})
            .not('reported', 'eq', true)
            .order('created_at', { ascending: false })
            .range(lastPost + 1, lastPost + 10)

        if (data) {
            setPostHome(postHome => [...postHome, ...data])
            setLastPost(lastPost + 10)
        }

        if(postHome.length === count){
            setDisable(true)
        }
    }

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
                postHome?.map(post => (
                    <Post
                        key={post.id}
                        post={post}
                        profile={post.profiles}
                    />
                ))
            }

            {
                !disable && <div
                    className="home-pagination"
                    onClick={loadMorePosts}
                >
                    <span className="home-pagination__text">See more</span>
                    <span><DownRoundArrow strokeWidth={2} /></span>
                </div>
            }

        </Layout>
    );
}

export default HomeScreen;