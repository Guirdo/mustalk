import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated } from "../../features/auth/authSlice";
import { supabase } from "../../utils/supabaseClient";

function SideBar() {

    const { user } = useSelector(state => state.auth) 
    const dispatch = useDispatch()
    const { push } = useRouter()

    const handleLogout = () => {
        dispatch(setAuthenticated(false))
        supabase.auth.signOut()
        push('/')
    }

    return (
        <aside className="home-aside">
            <button
                className="btn btn--primary-inline"
            >
                Home
            </button>
            <Link
                href={`/profile/${user?.username}`}
            >
                <a className="btn btn--primary-inline">
                    Profile
                </a>
            </Link>
            <button
                className="btn btn--primary-inline"
                onClick={handleLogout}
            >
                Log Out
            </button>
        </aside>
    );
}

export default SideBar;