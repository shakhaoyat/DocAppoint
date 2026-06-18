import React from 'react';
import Image from "next/image";
import HeroSlider from './HeroSlider';

const Hero = () => {
      return (
            <div className="hero bg-[url('/Hero.png')] min-h-screen container mx-auto px-4">
                  <div className="hero-content flex-col lg:flex-row-reverse gap-10">

                        {/* Slider */}
                        <div className="flex-shrink-0 w-full lg:w-1/2">
                              <HeroSlider />
                        </div>

                        {/* Content */}
                        <div className="w-full lg:w-1/2">
                              <h1 className="text-5xl font-bold leading-tight">
                                    Book Your Doctor Appointment Easily
                              </h1>

                              <p className="py-6 text-base-content/70">
                                    Find experienced doctors, book appointments instantly, and get
                                    quality healthcare without waiting in long queues. Your health,
                                    your time, your control.
                              </p>

                              <div className="flex gap-3">
                                    <button className="btn bg-accent">
                                          Book Appointment
                                    </button>

                                    <button className="btn btn-dash btn-info text-black">
                                          Learn More
                                    </button>
                              </div>
                        </div>

                  </div>
            </div>
      );
};

export default Hero;