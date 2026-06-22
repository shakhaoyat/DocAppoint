'use client';

import { Button, Input } from '@heroui/react';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';

import { useRouter } from 'next/navigation';

export default function Register() {
      const router = useRouter();
      const [isLoading, setIsLoading] = useState(false);

      const {
            register,
            handleSubmit,
            formState: { errors },
      } = useForm();

      const handleGoogleSignin = async () => {
            try {
                  const data = await authClient.signIn.social({
                        provider: 'google',
                  });

                  console.log(data);
            } catch (err) {
                  toast.error('Google sign-in failed');
            }
      };

      const onSubmit = async (data) => {
            try {
                  setIsLoading(true);

                  const { data: res, error } = await authClient.signUp.email({
                        name: data.name,
                        email: data.email,
                        password: data.password,
                        image: data.image,
                        callbackURL: '/',
                  });

                  if (error) {
                        toast.error(error.message || 'Signup failed');
                        return;
                  }

                  toast.success('Account created successfully');
                  router.push('/');
            } catch (err) {
                  toast.error('Something went wrong');
            } finally {
                  setIsLoading(false);
            }
      };

      return (
            <div className="min-h-[80vh] flex flex-col bg-slate-50 py-12 container mx-auto">
                  <div className="grow flex items-center justify-center p-4">
                        <div className="w-full max-w-md">
                              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-8 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

                                    <div className="text-center space-y-2 relative">
                                          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                                                Join <span className="text-blue-500">Doc</span>
                                                <span className="text-success">Appoint</span>
                                          </h2>
                                          <p className="text-slate-500 font-medium">
                                                Create Your Account For Doctor Appointments
                                          </p>
                                    </div>

                                    {/* FORM */}
                                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                                          {/* NAME */}
                                          <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 ml-1">
                                                      Full Name
                                                </label>
                                                <Input
                                                      className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                                                      placeholder="Enter your name"
                                                      startContent={<User className="w-5 h-5 text-slate-400" />}
                                                      {...register('name', {
                                                            required: 'Name is required',
                                                      })}
                                                />
                                                {errors.name && (
                                                      <p className="text-red-500 text-xs">
                                                            {errors.name.message}
                                                      </p>
                                                )}
                                          </div>

                                          {/* EMAIL */}
                                          <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 ml-1">
                                                      Email Address
                                                </label>
                                                <Input
                                                      className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                                                      type="email"
                                                      placeholder="Enter your email"
                                                      startContent={<Mail className="w-5 h-5 text-slate-400" />}
                                                      {...register('email', {
                                                            required: 'Email is required',
                                                            pattern: {
                                                                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                                  message: 'Invalid email',
                                                            },
                                                      })}
                                                />
                                                {errors.email && (
                                                      <p className="text-red-500 text-xs">
                                                            {errors.email.message}
                                                      </p>
                                                )}
                                          </div>

                                          {/* IMAGE */}
                                          <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 ml-1">
                                                      Profile Image URL
                                                </label>
                                                <Input
                                                      placeholder="https://images.unsplash.com/..."
                                                      type="url"
                                                      startContent={<User className="w-5 h-5 text-slate-400" />}
                                                      className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                                                      {...register('image', {
                                                            pattern: {
                                                                  value: /^(https?:\/\/.*)?$/,
                                                                  message: 'Invalid URL',
                                                            },
                                                      })}
                                                />
                                          </div>

                                          {/* PASSWORD */}
                                          <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 ml-1">
                                                      Password
                                                </label>
                                                <Input
                                                      className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                                                      type="password"
                                                      placeholder="••••••••"
                                                      startContent={<Lock className="w-5 h-5 text-slate-400" />}
                                                      {...register('password', {
                                                            required: 'Password is required',
                                                            minLength: {
                                                                  value: 6,
                                                                  message: 'Min 6 characters',
                                                            },
                                                      })}
                                                />
                                                {errors.password && (
                                                      <p className="text-red-500 text-xs">
                                                            {errors.password.message}
                                                      </p>
                                                )}
                                          </div>

                                          {/* BUTTON */}
                                          <Button
                                                color="primary"
                                                type="submit"
                                                isLoading={isLoading}
                                                className="w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-blue-600/20 group"
                                          >
                                                Create Account
                                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                          </Button>
                                    </form>

                                    {/* DIVIDER */}
                                    <div className="relative">
                                          <div className="absolute inset-0 flex items-center">
                                                <span className="w-full border-t border-slate-100"></span>
                                          </div>
                                          <div className="relative flex justify-center text-xs uppercase">
                                                <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">
                                                      Or with email
                                                </span>
                                          </div>
                                    </div>

                                    {/* GOOGLE */}
                                    <div className="space-y-4">
                                          <Button
                                                variant="bordered"
                                                onClick={handleGoogleSignin}
                                                className="w-full h-12 font-bold rounded-2xl border-slate-200 hover:bg-slate-50 transition-colors gap-3"
                                          >
                                                <Image
                                                      width={20}
                                                      height={20}
                                                      src="https://www.google.com/favicon.ico"
                                                      alt="Google"
                                                />
                                                Sign in with Google
                                          </Button>
                                    </div>

                                    {/* LOGIN */}
                                    <div className="text-center pt-2">
                                          <p className="text-sm text-slate-500 font-medium">
                                                Already have an account?{' '}
                                                <Link
                                                      href="/login"
                                                      className="text-blue-600 font-black hover:underline"
                                                >
                                                      Sign in
                                                </Link>
                                          </p>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
}