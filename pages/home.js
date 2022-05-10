import Image from "next/image";
import Link from "next/link";
import Compose from "../components/post/Compose";
import Post from "../components/post/Post";
import FloattingButton from "../components/utils/FloattingButton";
import Navbar from "../components/utils/Navbar";

function HomeScreen() {
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
                    <button
                        className="btn btn--primary-inline"
                    >
                        Profile
                    </button>
                    <button
                        className="btn btn--primary-inline"
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
            <FloattingButton />
        </>
    );
}

export default HomeScreen;