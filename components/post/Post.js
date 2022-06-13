import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import DeleteBtn from "../utils/DeleteBtn";
import LikeBtn from "../utils/LikeBtn";
import SaveBtn from "../utils/SaveBtn";

function Post({ post, username }) {
    const { id, author, description, songlink, created_at } = post
    const { user } = useSelector(state => state.auth)
    const { push } = useRouter()

    const formatDate = () => {
        const today = moment()
        let formatedDate = moment(created_at).fromNow()

        if(today.diff(created_at, 'days') > 0) {
            formatedDate = moment(created_at).format('MMM DD')
        }else if(today.diff(created_at, 'hours') > 20) {
            formatedDate = 'Yesterday'
        }else if(today.diff(created_at, 'days') > 365) {
            formatedDate = moment(created_at).format('MMMM Do, YY')
        }

        return formatedDate
    }

    return (
        <article className="post">
            <div>
                <Image
                    src="/icons/user.png"
                    height={40}
                    width={40}
                    alt="profile"
                />
            </div>
            <div 
                onClick={() => push(`/post/${id}`)}
            >
                <div>
                    <Link href={`/profile/${username}`} passHref><span className="post__user">{username}</span></Link>
                    <span>{' '}</span>
                    <span>{formatDate()}</span>
                </div>
                <div className="post-content">
                    <p>
                        {description}
                    </p>
                </div>
                <div className="music-card">
                    <p>
                        <a
                            href={songlink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {songlink}
                        </a>
                    </p>
                </div>
                <div className="post__actions">
                    <SaveBtn 
                        postId={id}
                        userId={user?.id}
                    />
                    <LikeBtn 
                        postId={id}
                        userId={user?.id}
                    />
                    {
                        author === user?.id && (
                            <DeleteBtn
                                postId={id}
                                author={author}
                            />
                        )
                    }
                </div>
            </div>
        </article>
    );
}

export default Post;