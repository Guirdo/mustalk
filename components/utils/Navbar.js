import { useState } from "react";
import Link from "next/link";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Cancel, Menu } from "iconoir-react";
import { supabase } from "../../utils/supabaseClient";
import { setAuthenticated } from "../../features/auth/authSlice";

function Navbar() {
    const { user } = useSelector(state => state.auth);
    const [isActive, setIsActive] = useState(false)
    const itemClasses = cx("navbar__item", { "navbar__item--active": isActive })
    const dispatch = useDispatch()
    const { push } = useRouter()

    const { username } = user || '';

    const handleLogout = () => {
        dispatch(setAuthenticated(false))
        supabase.auth.signOut()
        push('/')
    }

    return (
        <header>
            <nav className="navbar">
                <ul className="navbar__list">
                    <li className="navbar__brand">
                        <Link href="/home">
                            <a className="navbar__link">
                                MusTalk
                            </a>
                        </Link>
                    </li>

                    {/* <li
                        className={itemClasses}
                    >
                        <Image
                            src="/icons/user.png"
                            alt="user"
                            width={32}
                            height={32}
                        />
                    </li> */}

                    <li className={itemClasses}>
                        <Link href={`/profile/${username}`}>
                            <a className="navbar__link">
                                Profile
                            </a>
                        </Link>
                    </li>

                    <li className={itemClasses}>
                        <Link href='/bookmarks'>
                            <a className="navbar__link">
                                Bookmarks
                            </a>
                        </Link>
                    </li>

                    <li
                        className={itemClasses}
                        onClick={handleLogout}
                    >
                        Log out
                    </li>

                    <li
                        className="navbar__toggle"
                        onClick={() => setIsActive(!isActive)}
                    >
                        {
                            !isActive ? (
                                <span><Menu strokeWidth={2}/></span>
                            ) : (
                                <span><Cancel strokeWidth={2}/></span>
                            )
                        }
                    </li>

                </ul>
            </nav>
        </header>
    );
}

export default Navbar;