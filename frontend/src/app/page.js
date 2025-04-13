import Image from "next/image";
import Layout from "./(public)/layout";
import HeroSection from "./_home/HeroSection";
import TrustedSection from "./_home/TrustedSection";
import CTASection from "./_home/CTASection";
import BlogSection from "./_home/BlogsSection";


export default function Home() {
  return (
      <Layout>
          <HeroSection />
          <TrustedSection />
          <CTASection />
          <BlogSection />
      </Layout>
  );
}
