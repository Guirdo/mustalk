import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import ShareBtn from "../actions/ShareBtn";
import DeleteBtn from "../utils/DeleteBtn";
import LikeBtn from "../utils/LikeBtn";
import SaveBtn from "../utils/SaveBtn";

function PostCard({ post, username }) {
    const { id, author, description, songlink, created_at } = post
    const { user } = useSelector(state => state.auth)

    return (
        <article className="post-card">
            <div className="post-card__profile">
                <Image
                    src="/icons/user.png"
                    height={40}
                    width={40}
                    alt="profile"
                />

                <div>
                    <Link href={`/profile/${username}`} passHref><span className="post__user">{username}</span></Link>
                </div>
            </div>
            <div>
                <div className="post-card__content">
                    <p>
                        {description}
                    </p>
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
                    <ShareBtn />
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