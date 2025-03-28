import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js';
import { Mail, MessageSquare, User, Lock, EyeOff, Eye, Loader2 } from "lucide-react";
import {Link} from "react-router-dom"; 
import AuthImagePattern from "../components/AuthImagePattern.jsx"
import toast from 'react-hot-toast';

const LoginPage = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  console.log("\n\n", useAuthStore(), "\n\n");


  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    if(!formData.email.trim()) return toast.error("Haiyah Email is required!");

    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Haiyah wrong Email format!");

    if(!formData.password.trim()) return toast.error("Haiyah Password is required!");

    if(formData.password.length < 6) return toast.error("Haiyah Password should be atleast 6 characters!");

    return true;

   };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();
    if (success === true)
      login(formData);
  };


  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* left side */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>

        <div className='w-full max-w space y-8'>

          {/* LOGO */}
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>

              <div className='size-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className="size-9 text-primary" />
              </div>
              <h1 className='text-2xl font-bold mt-2'>Welcome Back</h1>
              <p className='text-base-content/60'>Log In to access your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>

            <div className="form-control"> {/*Email*/}
              <label className='label'>
                <span className='label-text font-medium'>Email</span>
              </label>

              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10'>
                  <Mail className="size-5 text-base-content/40" />
                </div>

                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder='you@example.com'
                  value={formData.email}
                  onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }}
                />
              </div>

            </div>

            <div className="form-control"> {/*Password*/}
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>

              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className="size-5 text-base-content/40 z-10" />
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder='********'
                  value={formData.password}
                  onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }}
                />

                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {
                    showPassword ?
                      (
                        <EyeOff className='size-5 text-base-content/40' />
                      ) : (
                        <Eye className='size-5 text-base-content/40' />
                      )
                  }
                </button>

              </div>

            </div>

            <button
              type='submit'
              className='btn btn-primary w-full'
              disabled={isLoggingIn}
            >
              {
                isLoggingIn ? (
                  <>
                    <Loader2 className='size-5 animate-spin' />
                    Loading...
                  </>
                ) : (
                  "Log In"
                )
              }
            </button>
          </form>

          <div className='text-center'>
            <p className='text-base-content/60'>
              Don't have an account?{" "}
              <Link to='/signup' className='link link-primary'>Sign Up</Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side panel */}
      <AuthImagePattern 
      title="Sign In"
      subtitle="Connect with friends, family, colleagues, share moments, work, whatever you want"
      />
    </div>
  )
}

export default LoginPage