'use client';

import { Button, Input } from '@heroui/react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import Image from 'next/image';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Login() {
      const router = useRouter();
      const [isLoading, setIsLoading] = useState(false);

      const {
            register,
            handleSubmit,
            formState: { errors },
      } = useForm();

      const handleGoogleSignin = async () => {
            try {
                  await authClient.signIn.social({ provider: 'google' });
            } catch (err) {
                  toast.error('Google login failed');
            }
      };

      const onSubmit = async (formData) => {
            try {
                  setIsLoading(true);

                  const { data: res, error } = await authClient.signIn.email({
                        email: formData.email,
                        password: formData.password,
                        rememberMe: true,
                        callbackURL: '/',
                  });

                  if (error) {
                        toast.error(error.message || 'Login failed');
                        return;
                  }

                  if (res) {
                        toast.success('Login successful');
                        router.push('/');
                  }
            } catch (err) {
                  toast.error('Something went wrong');
            } finally {
                  setIsLoading(false);
            }
      };

      return (
            <div className="min-h-[80vh] flex flex-col bg-slate-50">
                  <div className="flex items-center justify-center p-4">
                        <div className="w-full max-w-md">
                              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-8 relative overflow-hidden">

                                    <div className="text-center space-y-2 relative">
                                          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                                                Welcome <span className="text-blue-600">Back</span> To{' '}
                                                <span className="text-blue-500">Doc</span>
                                                <span className="text-success">Appoint</span>
                                          </h2>
                                          <p className="text-slate-500 font-medium">
                                                Sign in to your account
                                          </p>
                                    </div>

                                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                          {/* Email */}
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
                                                      })}
                                                />
                                                {errors.email && (
                                                      <p className="text-red-500 text-sm">
                                                            {errors.email.message}
                                                      </p>
                                                )}
                                          </div>

                                          {/* Password */}
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
                                                      })}
                                                />
                                                {errors.password && (
                                                      <p className="text-red-500 text-sm">
                                                            {errors.password.message}
                                                      </p>
                                                )}
                                          </div>

                                          <div className="flex justify-end">
                                                <Link
                                                      href="#"
                                                      className="text-sm font-bold text-blue-600 hover:underline underline-offset-4"
                                                >
                                                      Forgot password?
                                                </Link>
                                          </div>

                                          <Button
                                                color="primary"
                                                type="submit"
                                                isLoading={isLoading}
                                                className="w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-blue-600/20 group"
                                          >
                                                Sign In
                                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                          </Button>
                                    </form>

                                    {/* Divider */}
                                    <div className="relative">
                                          <div className="absolute inset-0 flex items-center">
                                                <span className="w-full border-t border-slate-100"></span>
                                          </div>
                                          <div className="relative flex justify-center text-xs uppercase">
                                                <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">
                                                      Or continue with
                                                </span>
                                          </div>
                                    </div>

                                    {/* Google */}
                                    <div className="space-y-4">
                                          <Button
                                                variant="bordered"
                                                onClick={handleGoogleSignin}
                                                className="w-full h-12 font-bold rounded-2xl border-slate-200 hover:bg-slate-50 gap-3"
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

                                    <div className="text-center pt-2">
                                          <p className="text-sm text-slate-500 font-medium">
                                                New to DocAppoint?{' '}
                                                <Link
                                                      href="/registration"
                                                      className="text-blue-600 font-black hover:underline underline-offset-4"
                                                >
                                                      Create an account
                                                </Link>
                                          </p>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
}