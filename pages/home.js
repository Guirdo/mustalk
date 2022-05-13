import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import Compose from "../components/post/Compose";
import Post from "../components/post/Post";
import Link from 'next/link';
import Layout from '../components/Layout';

function HomeScreen() {
    const [userName, setUserName] = useState(null)

    useEffect(() => {
        getProfile()
    }, [])

    async function getProfile() {
        try {
            //setLoading(true)
            const user = supabase.auth.user()

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`username`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setUserName(data.username)
                //setWebsite(data.website)
                //setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            alert(error.message)
        } finally {
            //setLoading(false)
        }
    }

    return (
        <Layout
            title="Home"
            userName={userName}
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