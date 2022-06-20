import { useState } from 'react'
import classNames from "classnames";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import validator from 'validator'
import { supabase } from '../../utils/supabaseClient';
import { useForm } from '../../hooks/useForm';
import Photo from '../profile/Photo';
import checkValidUrl from '../../utils/checkValidUrl';

function Compose() {
    const [count, setCount] = useState(0)
    const { user } = useSelector(state => state.auth);
    const [isInactive, setIsInactive] = useState(true)
    const { push } = useRouter()
    const [formValues, handleInputChange, reset] = useForm({
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
            if (isFormValid() && !user.banned) {
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
                push('/home')
            } else {
                alert('Please fill out all fields')
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleChange = (e) => {
        setCount(e.target.value.length)

        handleInputChange(e)
    }

    const isFormValid = () => {
        if (validator.isEmpty(description)) {
            return false
        } else if (!checkValidUrl(songlink)) {
            return false
        }

        return true
    }

    return (
        <div
            className="post"
            onFocus={handleFocus}
        >
            <Photo 
                src={user?.avatar_url}
                height={48}
                width={48}
            />
            <form
                onSubmit={handleSubmit}
            >
                <textarea
                    className="post__description"
                    placeholder={
                        user?.banned ? 
                            "You are banned from posting, may be you were not talking about music" 
                        : "What are you listening to?"
                    }
                    rows={4}
                    name="description"
                    value={description}
                    onChange={handleChange}
                    maxLength={400}
                    disabled={user?.banned}
                />
                <div className={classNames('post__char-count', { 'post--inactive': isInactive })} >
                    {count}/400
                </div>
                <input
                    className={classNames('post__song-input', { 'post--inactive': isInactive })}
                    type="text"
                    placeholder="Enter the song's link"
                    name="songlink"
                    value={songlink}
                    onChange={handleInputChange}
                    autoComplete="off"
                />

                <div className={classNames('post-actions', 'post-actions--right', { 'post--inactive': isInactive })}>
                    <button
                        className="btn btn--primary"
                        type='submit'
                    >
                        Post
                    </button>
                </div>
            </form>

        </div>
    );
}

export default Compose;