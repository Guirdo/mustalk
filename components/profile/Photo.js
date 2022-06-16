import Image from "next/image";

function Photo({ src, height, width,className}) {
    return (
        <figure className={className}>
            <Image
                className="post__user-photo"
                src={src ?
                    `https://soemnqnroxxnmbxbehex.supabase.co/storage/v1/object/public/avatars/${src}`
                    : "/icons/user.png"}
                height={height}
                width={width}
                alt="profile-photo"
            />
        </figure>
    );
}

export default Photo;