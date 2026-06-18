"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";

const doctorImages = [
      {
            src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=900&q=80",
            angle: "General Checkup",
      },
      {
            src: "https://plus.unsplash.com/premium_photo-1664302336737-37fce6daca3c?q=80&w=1170&auto=format&fit=crop",
            angle: "Doctor Consultation",
      },
      {
            src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=900&q=80",
            angle: "Patient Care",
      },
      {
            src: "https://plus.unsplash.com/premium_photo-1726880584477-6d69134f58a0?q=80&w=1170&auto=format&fit=crop",
            angle: "Hospital Ward",
      },
      {
            src: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=900&q=80",
            angle: "Medical Team",
      },
];

const HeroSlider = () => {
      const [current, setCurrent] = useState(0);

      //AUTO TIMER
      useEffect(() => {
            const interval = setInterval(() => {
                  setCurrent((p) =>
                        p === doctorImages.length - 1 ? 0 : p + 1
                  );
            }, 2000); // 3 sec

            return () => clearInterval(interval);
      }, []);

      const prev = () => {
            setCurrent((p) =>
                  p === 0 ? doctorImages.length - 1 : p - 1
            );
      };

      const next = () => {
            setCurrent((p) =>
                  p === doctorImages.length - 1 ? 0 : p + 1
            );
      };

      return (
            <div className="relative flex flex-col items-center gap-4">

                  {/* Main image */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                        <Image
                              key={current}
                              src={doctorImages[current].src}
                              alt={doctorImages[current].angle}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover"
                              priority
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Label */}
                        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium uppercase tracking-widest text-white bg-blue-600/80 px-3 py-1.5 rounded-full backdrop-blur-md shadow-md">
                              {doctorImages[current].angle}
                        </span>

                        {/* Prev */}
                        <button
                              onClick={prev}
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-blue-600 flex items-center justify-center text-white"
                        >
                              <RiArrowLeftLine size={16} />
                        </button>

                        {/* Next */}
                        <button
                              onClick={next}
                              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-blue-600 flex items-center justify-center text-white"
                        >
                              <RiArrowRightLine size={16} />
                        </button>
                  </div>

                  {/* Thumbnails */}
                  <div className="flex gap-2">
                        {doctorImages.map((img, i) => (
                              <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`relative w-14 h-10 rounded-lg overflow-hidden border-2 transition ${i === current
                                          ? "border-blue-500 opacity-100"
                                          : "border-transparent opacity-40 hover:opacity-70"
                                          }`}
                              >
                                    <Image src={img.src} alt={img.angle} fill className="object-cover" />
                              </button>
                        ))}
                  </div>

                  {/* Dots */}
                  <div className="flex gap-1.5">
                        {doctorImages.map((_, i) => (
                              <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`rounded-full transition ${i === current
                                          ? "w-5 h-1.5 bg-blue-500"
                                          : "w-1.5 h-1.5 bg-white/30"
                                          }`}
                              />
                        ))}
                  </div>
            </div>
      );
};

export default HeroSlider;