import Head from "next/head";
import Navbar from "./utils/Navbar";
import SideBar from "./utils/SideBar";

function Layout({ title, children }) {

    return (
        <>
            <Head>
                <title>{title || ''}</title>
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