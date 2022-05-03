import Link from "next/link";
import Post from "../components/post/Post";
import FloattingButton from "../components/utils/FloattingButton";
import Navbar from "../components/utils/Navbar";

function HomeScreen() {
    return (
        <div className="container">
            <Navbar />
            <main>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </main>
            <FloattingButton />
        </div>
    );
}

export default HomeScreen;