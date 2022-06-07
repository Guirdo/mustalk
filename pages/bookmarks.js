import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import Post from "../components/post/Post";
import { supabase } from "../utils/supabaseClient";

export const getStaticProps = async () => {
    try {
        let posts = []

        await supabase
            .from('bookmarks')
            .select('post_id')
            .match({ user_id: user.id })
            .then(res => {
                res.data.map(async (bk) => {
                    await supabase
                        .from('post')
                        .select('id,description,songlink,created_at,author,profiles:author(username)')
                        .match({ id: bk.post_id })
                        .single()
                        .then(res => posts.push(res.data))
                })
            })

        if(posts.length === 0){
            throw new Error('No bookmarks')
        }

        return {
            props: {
                posts
            }
        }
    }catch(e){
        console.log(e)
        return {
            props: {
                posts: null
            }
        }
    }finally {

    }
}

function BookmarksPage({ posts }) {
    const { user } = useSelector(state => state.auth);
    const { push } = useRouter();

    useEffect(() => {
        if (!user) {
            push('/')
        }
    })

    return (
        <Layout
            title="Bookmarks"
        >
            {
                posts ? (
                    posts.map(post => (
                        <Post
                            key={post.id}
                            post={post}
                            username={post.profiles.username}
                        />
                    ))
                ) : (
                    <div >
                        <p>Maybe you already have bookmarks, but I{"'"}m still working on them</p>
                        <p>Be patient. You can still save posts.</p>
                    </div>
                )
            }

        </Layout>
    );
}

export default BookmarksPage;