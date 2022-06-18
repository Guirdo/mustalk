import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import ShareBtn from "../actions/ShareBtn";
import DeleteBtn from "../actions/DeleteBtn";
import LikeBtn from "../actions/LikeBtn";
import SaveBtn from "../actions/SaveBtn";
import Photo from "../profile/Photo";

function Post({ post, profile }) {
    const { id, author, description, songlink, created_at } = post
    const { user } = useSelector(state => state.auth)
    const { username, avatar_url } = profile || {}
    const { push } = useRouter()

    const formatDate = () => {
        const today = moment()
        let formatedDate = moment(created_at).fromNow()

        if (today.diff(created_at, 'days') > 0) {
            formatedDate = moment(created_at).format('MMM DD')
        } else if (today.diff(created_at, 'hours') > 20) {
            formatedDate = 'Yesterday'
        } else if (today.diff(created_at, 'days') > 365) {
            formatedDate = moment(created_at).format('MMMM Do, YY')
        }

        return formatedDate
    }

    return (
        <article className="post">
            <div>
                <Photo
                    src={avatar_url}
                    height={48}
                    width={48}
                />
            </div>
            <div >
                <div>
                    <Link href={`/profile/${username}`} passHref><span className="post__user">{username}</span></Link>
                    <span>{' '}</span>
                    <span>{formatDate()}</span>
                </div>
                <div className="post-content"
                    onClick={() => push(`/post/${id}`)}
                >
                    <p>
                        {description}
                    </p>
                </div>
                <div className="post__music-card">
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
                    <ShareBtn
                        postId={id}
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