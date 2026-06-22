import Hero from "@/components/hero/Hero";
import HowItWorks from "@/components/HowItWorks";
import LoadingSpinner from "@/components/LoadingSpinner";
import TopDoctors from "@/components/TopDoctors";
import WhyChooseUs from "@/components/WhyChooseUs";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <Hero></Hero>
        <TopDoctors></TopDoctors>
        <WhyChooseUs></WhyChooseUs>
        <HowItWorks></HowItWorks>
      </Suspense>
    </div>
  );
}
