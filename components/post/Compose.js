import { useState } from 'react'
import classNames from "classnames";
import Image from "next/image";
import { useForm } from '../../hooks/useForm';
import { useSelector } from 'react-redux';
import { supabase } from '../../utils/supabaseClient';
import { useRouter } from 'next/router';

function Compose() {
    const { user } = useSelector(state => state.auth);
    const [isInactive, setIsInactive] = useState(true)
    const { push } = useRouter()
    const [formValues, handleInputChange,reset] = useForm({
        description: '',
        songlink: ''
    })

    const { description, songlink } = formValues

    const handleFocus = () => {
        setIsInactive(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { _, error } = await supabase
                .from('post')
                .insert({
                    description,
                    songlink,
                    author: user.id,
                })

            if (error) {
                throw error
            }

            reset()
            push(window.location.pathname)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div
            className="post"
            onFocus={handleFocus}
        >
            <figure className="post-user">
                <Image
                    src="/icons/user.png"
                    alt="user"
                    height={40}
                    width={40}
                />
            </figure>
            <form
                className="post-content"
                onSubmit={handleSubmit}
            >
                <textarea
                    className="post__description"
                    placeholder="What are you listening to?"
                    rows={4}
                    name="description"
                    value={description}
                    onChange={handleInputChange}
                />
                <div className={classNames('post__char-count', { 'post--inactive': isInactive })} >0/500</div>
                <input
                    className={classNames('post__song-input', { 'post--inactive': isInactive })}
                    type="text"
                    placeholder="Enter the song's link"
                    name="songlink"
                    value={songlink}
                    onChange={handleInputChange}
                />

                <div className={classNames('post-actions', 'post-actions--right', { 'post--inactive': isInactive })}>
                    <button
                        className="btn btn--primary"
                    >
                        Post
                    </button>
                </div>
            </form>

        </div>
    );
}

export default Compose;