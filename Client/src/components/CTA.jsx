import React from "react";
import ShinyText from "./ui/ShinyText";
import { AuroraText, FadeUpText, ShimmerButton } from "./ui";
import { motion, useInView } from "motion/react";
import { useNavigate } from "react-router";

function CTA() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const navigate = useNavigate();

  return (
    <div className="sm:h-screen h-[80vh] m-0 p-0 w-full flex justify-center items-center text-neutral-400 relative">
      {/* Ocean Abyss Background with Top Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 70% at 50% 0%, rgba(0, 229, 255, 0.3), transparent 60%), #000000",
        }}
      />

      <div className="absolute text-4xl font-bold tracking-tight md:text-5xl lg:text-7xl text-center">
        <motion.div
          ref={ref}
          initial={{ filter: "blur(20px)", opacity: 0 }}
          animate={isInView ? { filter: "blur(0px)", opacity: 1 } : {}}
          transition={{ duration: 1.2 }}
          className="flex flex-col items-center gap-4">
          {/* <AuroraText>Medify</AuroraText> */}
          <ShinyText
            text="Medical History Made Effortless"
            speed={3}
            className="text-3xl lg:text-6xl"
          />
          <p className="text-xl tracking-normal font-medium">
            No more files or folders—just clear, accessible health data at your
            fingertips.
          </p>
        </motion.div>

        <ShimmerButton className="mx-auto mt-10 text-base" onClick={() => navigate("/login")} >
          <span className="w-full h-full text-white px-2 tracking-wide">Get Started</span>
        </ShimmerButton>
      </div>
    </div>
  );
}

export default CTA;
