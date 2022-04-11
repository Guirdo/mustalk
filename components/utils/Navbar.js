import Link from "next/link";

function Navbar() {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <span>X</span>
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