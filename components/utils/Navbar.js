import Image from "next/image";
import Link from "next/link";

function Navbar() {
    return (
        <header>
            <nav className="navbar">
                <ul className="navbar__list">
                    <li className="navbar__user-image">
                        <Image
                            src="/icons/user.png"
                            alt="user"
                            width={32}
                            height={32}
                        />
                    </li>

                    <li className="navbar__brand">
                        <Link href="/home">
                            <a className="navbar__link">
                                MusTalk
                            </a>
                        </Link>
                    </li>

                    <li className="navbar__item">
                        <Link href="/home">
                            <a className="navbar__link">
                                Home
                            </a>
                        </Link>
                    </li>

                </ul>
            </nav>
        </header>
    );
}

export default Navbar;