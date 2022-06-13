import Head from "next/head";
import Navbar from "./utils/Navbar";
import SideBar from "./utils/SideBar";

function Layout({ title, description, author, children }) {

    return (
        <>
            <Head>
                <title>{title || ''}</title>
                <meta name="description" content={description || "Let's talk about your music"} />
                <meta name="author" content={author || ''} />

                { /* TODO add meta tags for FB and TW */ }
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