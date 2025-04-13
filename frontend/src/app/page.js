import Image from "next/image";
import Layout from "./(public)/layout";
import HeroSection from "./_home/HeroSection";
import TrustedSection from "./_home/TrustedSection";
import CTASection from "./_home/CTASection";


export default function Home() {
  return (
      <Layout>
          <HeroSection />
          <TrustedSection />
          <CTASection />
      </Layout>
  );
}
