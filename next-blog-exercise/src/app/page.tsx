"use client";

import Description from "@/components/Description";
import Hero from "@/components/Hero";
import LatestPost from "@/components/LatestPost";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Description />
      <LatestPost />
    </main>
  );
}
