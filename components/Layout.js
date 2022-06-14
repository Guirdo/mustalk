import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser, setAuthenticated } from "../features/auth/authSlice";
import { supabase } from "../utils/supabaseClient";
import Navbar from "./utils/Navbar";
import SideBar from "./utils/SideBar";

function Layout({ title, description, author, children }) {

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
    },[])

    return (
        <>
            <Head>
                <title>{title || ''}</title>
                <meta name="description" content={description || "Let's talk about your music"} />
                <meta name="author" content={author || ''} />

                { /* TODO add meta tags for FB and TW */}
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

export default Layout;