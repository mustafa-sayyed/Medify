import { CTA, FeaturesSection, Footer, Hero, Navbar } from "@/components";
import { motion } from "motion/react";
import React from "react";

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
      <Navbar />
      <Hero />
      <FeaturesSection />
      <CTA />
      <Footer />
    </motion.div>
  );
}

export default Home;
