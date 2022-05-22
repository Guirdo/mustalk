import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import DeleteBtn from "../utils/DeleteBtn";
import LikeBtn from "../utils/LikeBtn";
import SaveBtn from "../utils/SaveBtn";

function Post({ post, username }) {

    const { id, author, description, songlink, created_at } = post
    const { user } = useSelector(state => state.auth)

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
            <div>
                <div>
                    <Link href={`/profile/${username}`} passHref><span className="post__user">{username}</span></Link>
                    <span>{' '}</span>
                    <span>{moment(created_at).format('MMMM/DD/YY hh:mm')}</span>
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
                    <SaveBtn />
                    <LikeBtn 
                        postId={id}
                        userId={user?.id}
                    />
                    {
                        author === user?.id && (
                            <DeleteBtn
                                id={id}
                            />
                        )
                    }
                </div>
            </div>
        </article>
    );
}

export default Post;