import Image from "next/image";

function Post() {
    return (
        <div className="container">
            <div className="post">
                <div className="user">
                    <Image
                        src="/icons/user.png"
                        height={40}
                        width={40}
                        alt="profile"
                    />
                </div>
                <div className="content">
                    <textarea
                        placeholder="What are you listening to?"
                        rows={6}
                    />
                    <div className="char-count">0/500</div>
                    <input
                        type="text"
                        placeholder="Enter the song's link"
                    />

                    <div className="actions">
                        <button className="btn btn-primary">
                            Post
                        </button>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default Post;