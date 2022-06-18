import moment from "moment";
import Link from "next/link";
import { useSelector } from "react-redux";
import ShareBtn from "../actions/ShareBtn";
import DeleteBtn from "../actions/DeleteBtn";
import LikeBtn from "../actions/LikeBtn";
import SaveBtn from "../actions/SaveBtn";
import Photo from "../profile/Photo";

function PostCard({ post, profile }) {
    const { id, author, description, songlink, created_at } = post
    const { user } = useSelector(state => state.auth)
    const { username, avatar_url } = profile || {}

    return (
        <article className="post-card">
            <div className="post-card__profile">
                <Photo 
                    src={avatar_url}
                    height={48}
                    width={48}
                />

                <div>
                    <Link href={`/profile/${username}`} passHref><span className="post__user">{username}</span></Link>
                </div>
            </div>
            <div>
                <div className="post-card__content">
                    <span className="post-card__description">
                        {description}
                    </span>
                </div>
                <div className="post-card__music-card">
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
                <div
                    className="post-card__date"
                >
                    <span>{moment(created_at).format('HH:mm - MMM D, YYYY')}</span>
                </div>
                <hr />
                <div className="post-card__actions">
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
                        username={username}
                        description={description}
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
                <hr />
            </div>
        </article>
    );
}

export default PostCard;