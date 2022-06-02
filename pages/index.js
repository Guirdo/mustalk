import { useState, useEffect } from 'react'
import Link from "next/link";
import { useForm } from "../hooks/useForm";
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import validator from 'validator';
import AuthLayout from "../components/AuthLayout";
import { getUser, setAuthenticated } from '../features/auth/authSlice';

export default function Home() {

  const dispatch = useDispatch()
  const [user, setUser] = useState(supabase.auth.user() || null)
  const [logged, setLogged] = useState(false)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [formValues, handleInputChange] = useForm({
    email: ""
  })

  const { email } = formValues;

  useEffect(() => {
    console.log()
    if (user) {
      dispatch(setAuthenticated(true))
      dispatch(getUser())
      router.push('/home')
    }
    supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(supabase.auth.user() || null)
    })
  })

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (validator.isEmail(email)) {
        setLoading(true)
        const { error } = await supabase.auth.signIn({ email })
        if (error) throw error
        setLogged(true)
      }else{
        alert('Please enter a valid email')
      }
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async() => {
    const { error } = await supabase.auth.signIn({provider: 'google'})
  }

  return (
    <AuthLayout>
      <h1 className="auth__title">MusTalk</h1>

      <h2 className="auth__subtitle">Let{"'"}s talk about your music</h2>

      {
        !logged ? (
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
              disabled={loading}
            >
              {loading ? "Loading..." : "Log In"}
            </button>
          </form>
        ) : (
          <p className='auth__message'>Check your email for the login link!</p>
        )
      }

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
