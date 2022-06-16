import Head from "next/head"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getUser, setAuthenticated } from "../../features/auth/authSlice"
import { supabase } from "../../utils/supabaseClient"
import Navbar from "../utils/Navbar"
import SideBar from "../utils/SideBar"

function PostLayout({ slug, description, author, children }) {

    const [user, setUser] = useState(supabase.auth.user() || null)
    const dispatch = useDispatch()

    useEffect(() => {
        if (user) {
            dispatch(setAuthenticated(true))
            dispatch(getUser())
        }
        supabase.auth.onAuthStateChange(async (event, session) => {
            setUser(supabase.auth.user() || null)
        })
    }, [])

    return (
        <>
            <Head>
                <title>{`Post by ${author}`}</title>
                <meta name="description" content={description || "Let's talk about your music"} />
                <meta name="author" content={author || ''} />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://mustalk.vercel.app/post/${slug}`} />
                <meta property="og:title" content={`Post by ${author}`} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={'/icons/mt.png'} />

                {/* Twitter Card */}
                <meta property="twitter:card" content={'/icons/mt.png'} />
                <meta property="twitter:url" content={`https://mustalk.vercel.app/post/${slug}`}  />
                <meta property="twitter:title" content={`Post by ${author}`} />
                <meta property="twitter:description" content={description} />
                <meta property="twitter:image" content={'/icons/mt.png'} />
            </Head>

            <header>
                <Navbar />
            </header>

            <main>
                <SideBar />
                <div className='home-main'>
                    {children}
                </div>
            </main>
        </>
    );
}


export default PostLayout;