import { useState,useEffect } from 'react'
import Link from "next/link";
import AuthLayout from "../components/AuthLayout";
import { useForm } from "../hooks/useForm";
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router';

export default function Home() {

  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [formValues, handleInputChange] = useForm({
    email: ""
  })

  const { email } = formValues;

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      session && router.push('/home')
    })
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <h1 className="auth__title">MusTalk</h1>

      <h2 className="auth__subtitle">Let{"'"}s talk about your music</h2>

      <form onSubmit={handleLogin}>
        <input
          className="auth__input"
          placeholder="Enter your email"
          type="email"
          value={email}
          name="email"
          onChange={handleInputChange}
        />

        <button
          className="btn btn--primary btn--block"
          type="submit"
        >
          {loading ? "Loading..." : "Log In"}
        </button>
      </form>


      <p>You{"'"}ll receive a ✨magic link✨</p>
      <div>

        <p>
          <Link href="#">
            Notice of privacy
          </Link>
        </p>
      </div>

      <p>From Mexico with ❤️ for the World</p>
    </AuthLayout>
  )
}
