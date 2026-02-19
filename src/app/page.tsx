import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoStrip from "@/components/LogoStrip";
import VideoSection from "@/components/VideoSection";
import ProblemSlide from "@/components/ProblemSlide";
import Stats from "@/components/Stats";
import SolutionSlide from "@/components/SolutionSlide";
import Testimonials from "@/components/Testimonials";
import ProcessTimeline from "@/components/ProcessTimeline";
import WorkSlide from "@/components/WorkSlide";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import BackgroundGlow from "@/components/BackgroundGlow";

export default function Home() {
  return (
    <>
      {/* Fixed CSS animated gradient background — behind everything */}
      <BackgroundGlow />

      {/* All page content sits above the background */}
      <div className="relative" style={{ zIndex: 10 }}>
        <Navbar />
        <main>
          {/* 1. Hero — The Statement Slide */}
          <Hero />

          {/* Interstitial: social proof marquee */}
          <LogoStrip />

          {/* Featured video — platform demo */}
          <VideoSection />

          {/* 2. Problem — Emotional Hook */}
          <ProblemSlide />

          {/* Interstitial: animated stats */}
          <Stats />

          {/* 3. Solution — Here's How We Help */}
          <SolutionSlide />

          {/* Interstitial: testimonials */}
          <Testimonials />

          {/* 4. Process — Pinned step-by-step timeline */}
          <ProcessTimeline />

          {/* 5. Work — Pinned fullscreen project scenes */}
          <WorkSlide />

          {/* 6. CTA — Strong ending */}
          <CallToAction />
        </main>
        <Footer />
      </div>
    </>
  );
}
