import { ShareAndroid } from "iconoir-react";

function ShareBtn({ postId,username,description }) {
    const handleClick = () => {
        const post = `${username} - ${description}
https://mustalk.vercel.app/post/${postId}`;

        navigator.clipboard.writeText(post)
            .then(() => {
                alert('Copied to clipboard!');
            })
            .catch(err => {
                alert("Sorry, it's doesn't work in your browser");
            });
    }

    return (
        <div
            className="post-action post-action--share"
            onClick={handleClick}
        >
            <span>
                <ShareAndroid strokeWidth={2} />
            </span>
            <span
                className="post-action__text"
            >
                Share
            </span>
        </div>
    );
}

export default ShareBtn;