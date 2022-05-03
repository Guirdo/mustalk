import { useRouter } from "next/router";

function FloattingButton() {

    const router = useRouter();

    const handleClick = () => {
        console.log("Clicked");
        router.push("/compose/post");
    }

    return (
        <div 
            className="btn-floatting"
            onClick={handleClick}
        >
            +
        </div>
    );
}

export default FloattingButton;