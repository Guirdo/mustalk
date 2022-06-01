import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import Post from "../components/post/Post";
import { supabase } from "../utils/supabaseClient";

function BookmarksPage() {
    const [posts, setPosts] = useState([])
    const { user } = useSelector(state => state.auth);
    const { push } = useRouter();

    useEffect(() => {
        async function getBookmarks() {
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
                            .then(res => setPosts(posts => [...posts, res.data]))
                    })
                })
        }   

        if (!user) {
            push('/')
        }

        getBookmarks()
    }, [])

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
                        <p>You have no bookmarks</p>
                    </div>
                )
            }

        </Layout>
    );
}

export default BookmarksPage;