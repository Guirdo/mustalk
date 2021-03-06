import Link from "next/link";
import AuthLayout from "../../components/AuthLayout";

function RegisterScreen() {
    return (
        <AuthLayout
            title="Sign up"
        >
            <h1 className="auth__title">
                <Link href="/"><a className="link--no-decoration">MusTalk</a></Link>
            </h1>

            <form className="form">
                <input
                    className="auth__input"
                    type="email"
                    placeholder="Email"
                />

                <input
                    className="auth__input"
                    type="text"
                    placeholder="Username"
                />

                <input
                    className="auth__input"
                    type="password"
                    placeholder="Password"
                />

                <input
                    className="auth__input"
                    type="password"
                    placeholder="Confirm Password"
                />

                <button
                    className="btn btn--primary btn--block"
                    type="submit"
                >
                    Sign up
                </button>
            </form>

            <div className="auth__link-container">
                <p>
                    <Link href="#">
                        Notice of privacy
                    </Link>
                </p>
                <p>
                    <Link
                        href="/auth/login"
                    >
                        Already register?
                    </Link>
                </p>
            </div>

        </AuthLayout>
    );
}

export default RegisterScreen;