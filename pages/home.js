import Compose from "../components/post/Compose";
import Post from "../components/post/Post";
import Layout from '../components/Layout';

function HomeScreen() {
    return (
        <Layout
            title="Home"
        >
            <div className='home-main'>
                <div className="home-compose">
                    <Compose />
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