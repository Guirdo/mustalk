import { useState } from 'react'
import classNames from "classnames";
import Image from "next/image";
import { useForm } from '../../hooks/useForm';

function Compose() {
    const [isInactive, setIsInactive] = useState(false)
    const [formValues,handleInputChange] = useForm({
        description: '',
        songLink: ''
    })

    const { description,songLink } = formValues

    const handleFocus = (e) => {
        setIsInactive(false)
    }

    const handlePost = () => {

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
            <div className="post-content">
                <textarea
                    className="post__description"
                    placeholder="What are you listening to?"
                    rows={4}
                    name="description"
                    value={description}
                    onChange={handleInputChange}
                />
                <div className={classNames('post__char-count', { 'post--inactive': isInactive })} /* "post__char-count post--inactive" */>0/500</div>
                <input
                    className={classNames('post__song-input', { 'post--inactive': isInactive })}
                    type="text"
                    placeholder="Enter the song's link"
                    name="songLink"
                    value={songLink}
                    onChange={handleInputChange}
                />

                <div className={classNames('post-actions','post-actions--right', { 'post--inactive': isInactive })}>
                    <button 
                        className="btn btn--primary"
                        onClick={handlePost}
                    >
                        Post
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Compose;