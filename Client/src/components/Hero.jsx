import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "motion/react";
import { FadeUpText, LightRays } from "./ui";

function Hero() {

  return (
    <div className="relative flex min-h-screen w-full bg-black overflow-hidden">
      {/* Background grid */}
      <div
        className={cn(
          "absolute inset-0 z-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />

      {/* Radial black overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black" />

      {/* Light Rays */}
      <div className="absolute inset-0 z-10">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={2}
          followMouse={true}
          mouseInfluence={0.2}
          noiseAmount={0.1}
          distortion={0.01}
        />
      </div>

      {/* Hero content */}
      <div className="absolute z-20 w-full h-full flex flex-col justify-center mt-10 px-4 font-manrope">
        <FadeUpText delay={0.3}>
          <motion.h1 className="py-8 text-4xl font-bold text-neutral-300 sm:text-[5rem] text-center">
            {/* <span className="bg-gradient-to-b bg-clip-text text-transparent from-gray-50 to-cyan-800 ">Your Health</span>, */}
            Your Health,
            <br /> Always in Your Hands
          </motion.h1>
        </FadeUpText>

        <div className="py-2 text-lg text-neutral-300 sm:text-2xl text-center">
          <FadeUpText delay={0.5}>
            Secure, Smart, and Seamless AI Powered Personal Health Record Management.
          </FadeUpText>
        </div>
      </div>
    </div>
  );
}

export default Hero;
