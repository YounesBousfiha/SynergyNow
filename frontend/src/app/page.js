import Image from "next/image";
import Layout from "./(public)/layout";
import HeroSection from "./_home/HeroSection";
export default function Home() {
  return (
      <Layout>
          <HeroSection />
      </Layout>
  );
}
