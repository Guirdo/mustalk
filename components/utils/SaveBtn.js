import Image from "next/image";

function SaveBtn() {
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
                Save
            </span>
        </div>
    );
}

export default SaveBtn;