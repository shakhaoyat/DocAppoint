import Hero from "@/components/hero/Hero";
import HowItWorks from "@/components/HowItWorks";
import TopDoctors from "@/components/TopDoctors";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <TopDoctors></TopDoctors>
      <WhyChooseUs></WhyChooseUs>
      <HowItWorks></HowItWorks>
    </div>
  );
}
