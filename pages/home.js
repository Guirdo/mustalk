import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import Compose from "../components/post/Compose";
import Post from "../components/post/Post";
import FloattingButton from "../components/utils/FloattingButton";
import Navbar from "../components/utils/Navbar";
import Link from 'next/link';

function HomeScreen() {
    const [userName, setUserName] = useState(null)

    useEffect(() => {
        getProfile()
    }, [])

    async function getProfile() {
        try {
            //setLoading(true)
            const user = supabase.auth.user()

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`username`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setUserName(data.username)
                //setWebsite(data.website)
                //setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            alert(error.message)
        } finally {
            //setLoading(false)
        }
    }

    return (
        <>
            <Navbar />

            <div className="home-section">
                <aside className="home-aside">
                    <button
                        className="btn btn--primary-inline"
                    >
                        Home
                    </button>
                    <Link
                        href={`/profile/${userName}`}
                    >
                        <a className="btn btn--primary-inline">
                        Profile 
                        </a>
                    </Link>
                    <button
                        className="btn btn--primary-inline"
                        onClick={() => supabase.auth.signOut()}
                    >
                        Log Out
                    </button>
                </aside>

                <main className="home-main">
                    <div className="home-compose">
                        <Compose />
                    </div>

                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </main>
            </div>
        </>
    );
}

export default HomeScreen;