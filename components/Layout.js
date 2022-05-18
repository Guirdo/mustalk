import Head from "next/head";
import { useSelector } from "react-redux";
import Navbar from "./utils/Navbar";
import SideBar from "./utils/SideBar";

function Layout({ title,children }) {

    const { user } = useSelector(state => state.auth);

    return (
        <>

            <Head>
                <title>{title}</title>
            </Head>

            <header>
                <Navbar />
            </header>

            <main>
                <SideBar />
                { children }
            </main>
        </>
    );
}

export default Layout;