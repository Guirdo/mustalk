import Head from "next/head";
import Navbar from "./utils/Navbar";
import SideBar from "./utils/SideBar";

function Layout({ title,userName,children }) {
    return (
        <>

            <Head>


                <title>{title}</title>
            </Head>

            <header>
                <Navbar />
            </header>

            <main>
                <SideBar userName={userName}/>
                { children }
            </main>
        </>
    );
}

export default Layout;