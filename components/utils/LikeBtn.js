import Image from "next/image";

function LikeBtn() {
    return (
        <div className="action">
            <span>
                <Image
                    src="/icons/heart.png"
                    height={20}
                    width={20}
                    alt="heart"
                />
            </span>
            <span>
                Like
            </span>
        </div>
    );
}

export default LikeBtn;