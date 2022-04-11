import Post from "../components/post/Post";
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
        </div>
    );
}

export default HomeScreen;