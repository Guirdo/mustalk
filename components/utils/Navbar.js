import Image from "next/image";
import Link from "next/link";

function Navbar() {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Image
                            src="/icons/user.png"
                            alt="user"
                            width={32}
                            height={32}
                        />
                    </li>
                    <li>
                        <Link href="/home">Home</Link>
                    </li>

                </ul>
            </nav>
        </header>
    );
}

export default Navbar;