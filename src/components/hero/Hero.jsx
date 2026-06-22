"use client";

import React from "react";
import { Button } from "@heroui/react";
import HeroSlider from "./HeroSlider";
import Link from "next/link";

const Hero = () => {
      return (
            <section
                  className="min-h-screen bg-cover bg-center container mx-auto"
                  style={{ backgroundImage: "url('/Hero.png')" }}
            >
                  <div className="container mx-auto px-6 py-20 flex flex-col-reverse items-center gap-12 lg:flex-row">
                        {/* Content */}
                        <div className="w-full lg:w-1/2 space-y-6">
                              <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                                    Book Your Doctor Appointment Easily
                              </h1>

                              <p className="text-default-500 text-lg leading-relaxed">
                                    Find experienced doctors, book appointments instantly, and get
                                    quality healthcare without waiting in long queues. Your health,
                                    your time, your control.
                              </p>

                              <div className="flex flex-wrap gap-4">
                                    <Link href="/all-appointments"> <Button

                                          color="primary"
                                          size="lg"
                                          radius="none"
                                          className="!rounded-none"
                                    >
                                          Book Appointment
                                    </Button></Link>

                                    <Link href="/"><Button
                                          variant="bordered"
                                          size="lg"
                                          radius="none"
                                          className="!rounded-none border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white transition-colors"
                                    >
                                          Learn More
                                    </Button></Link>
                              </div>
                        </div>

                        {/* Slider */}
                        <div className="w-full lg:w-1/2">
                              <HeroSlider />
                        </div>
                  </div>
            </section>
      );
};

export default Hero;