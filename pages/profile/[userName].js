import Layout from "../../components/Layout";
import Post from "../../components/post/Post";
import Profile from "../../components/profile/Profile";
import { supabase } from "../../utils/supabaseClient";

export const getStaticPaths = async () => {
    //const user = supabase.auth.user()

    const { data } = await supabase
        .from('profiles')
        .select(`username`)

    const paths = data.map(user => ({
        params: {
            userName: user.username
        }
    }))

    return {
        paths,
        fallback: true
    }
}

export const getStaticProps = async ({ params }) => {
    const { data } = await supabase
        .from('profiles')
        .select(`id, username`)
        .eq('username', params.userName)
        .single()

    const user = JSON.stringify(data)

    /*     if (!items.length) {
            return {
                redirect: {
                    destination: '/blog',
                    permanent: false,
                }
            }
        } */

    return {
        props: {
            user
        }
    }
}

function UserPage({ slug, user }) {

    const { id, username } = JSON.parse(user)

    return (
        <Layout
            title={username}
            userName={username}
        >

            <div className='home-main'>
                <Profile userName={username} />

                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>

        </Layout>
    );
}

export default UserPage;