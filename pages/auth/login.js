import Link from "next/link";
import AuthLayout from "../../components/AuthLayout";

function LoginScreen() {
    return (
        <AuthLayout
            title="Log in"
        >
            <h1 className="big-title  text-primary">
                <Link href="/"><a className="no-decoration">MusTalk</a></Link>
            </h1>

            <form>

                <input
                    type="email"
                    placeholder="Email"
                />

                <input
                    type="password"
                    placeholder="Password"
                />

                <button
                    className="btn btn-primary btn-block"
                >
                    Log In
                </button>
            </form>

            <div className="container">
                <p>
                    <Link href="#">
                        Notice of privacy
                    </Link>
                </p>
                <p>
                    <Link
                        href="/auth/register"
                    >
                        New here?
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}

export default LoginScreen;