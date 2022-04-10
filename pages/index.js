import Link from "next/link";
import AuthLayout from "../components/AuthLayout";

export default function Home() {
  return (
    <AuthLayout>
      <h1 className="big-title text-primary">MusTalk</h1>

      <h2>Let{"'"}s talk about your music</h2>

      <div>
        <Link href='/auth/register' passHref>
          <button className="btn btn-primary btn-block">
            Sign up
          </button>
        </Link>
        <Link href="/auth/login" passHref>
          <button className="btn btn-primary btn-block">
            Log in
          </button>
        </Link>
      </div>

      <p>From Mexico with ❤️ for the World</p>
    </AuthLayout>
  )
}
