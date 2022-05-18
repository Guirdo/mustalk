import Compose from "../components/post/Compose";
import Post from "../components/post/Post";
import Layout from '../components/Layout';
import { useSelector } from "react-redux";
import Link from "next/link";

function HomeScreen() {

    const { isAuthenticated } = useSelector(state => state.auth)

    return (
        <Layout
            title="Home"
        >
            <div className='home-main'>
                <div className="home-compose">
                    {
                        isAuthenticated ? (
                            <Compose />
                        ) : (
                            <div className="home-unauthenticated">
                                <p>Please <Link href="/">Login</Link> to post</p>
                            </div>
                        )
                    }
                </div>

                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </Layout>
    );
}

export default HomeScreen;