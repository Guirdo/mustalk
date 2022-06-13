import { ShareAndroid } from "iconoir-react";

function ShareBtn() {

    const handleClick = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);

        alert('Copied to clipboard!');
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