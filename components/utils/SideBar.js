import Link from "next/link";
import { supabase } from "../../utils/supabaseClient";

function SideBar({userName}) {
    return (
        <aside className="home-aside">
            <button
                className="btn btn--primary-inline"
            >
                Home
            </button>
            <Link
                href={`/profile/${userName}`}
            >
                <a className="btn btn--primary-inline">
                    Profile
                </a>
            </Link>
            <button
                className="btn btn--primary-inline"
                onClick={() => supabase.auth.signOut()}
            >
                Log Out
            </button>
        </aside>
    );
}

export default SideBar;