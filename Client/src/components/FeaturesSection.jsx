import { RiTimeLine } from "react-icons/ri";
import { AiOutlineRobot } from "react-icons/ai";
import { FaPills } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import { GiStethoscope } from "react-icons/gi";
import { MdOutlineHealthAndSafety, MdOutlineDashboard } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";
import { HiChartPie } from "react-icons/hi";
import { SpotlightCard } from "./ui";

export const features = [
  {
    title: "AI-Powered Symptom Insights",
    description:
      "Get instant suggestions based on symptoms and patterns using Medify AI.",
    icon: <AiOutlineRobot />,
    iconLib: "react-icons/ai",
  },
  {
    title: "Personalized Health Dashboards",
    description: "Get real-time overviews, alerts, and trends tailored to your profile.",
    icon: <MdOutlineDashboard />,
    iconLib: "react-icons/md",
  },
  {
    title: "Smart Medication Scheduler",
    description: "Track, schedule, and receive reminders for medications seamlessly.",
    icon: <FaPills />,
    iconLib: "react-icons/fa",
  },
  {
    title: "Intelligent Health Timeline",
    description:
      "Visualize your entire medical history in a scrollable, AI-enhanced timeline.",
    icon: <RiTimeLine />,
    iconLib: "react-icons/ri",
  },
  {
    title: "Unified Health Document Vault",
    description:
      "Securely store, organize, and search your prescriptions, reports, and bills.",
    icon: <FiUploadCloud />,
    iconLib: "react-icons/fi",
  },
  {
    title: "Doctor & Visit Tracker",
    description: "Maintain a record of consultations, diagnoses, and treatment history.",
    icon: <GiStethoscope />,
    iconLib: "react-icons/gi",
  },
  {
    title: "Emergency Health Snapshot",
    description: "Create a sharable summary of essential health data for emergencies.",
    icon: <MdOutlineHealthAndSafety />,
    iconLib: "react-icons/md",
  },
  {
    title: "Chat With Medify AI Assistant",
    description:
      "Ask questions and explore your data with a AI Powered Health Assistant.",
    icon: <BiMessageDetail />,
    iconLib: "react-icons/bi",
  },
  {
    title: "Analytics on Health Trends",
    description: "Gain insights into recurring conditions and lifestyle improvements.",
    icon: <HiChartPie />,
    iconLib: "react-icons/hi",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-black text-white py-20 px-6 md:px-12" id="features">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Smarter Health. Simplified Records.</h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Medify brings your entire medical history together — AI-powered insights, secure
          storage, and easy access anytime, anywhere.
        </p>
      </div>

      <div className="sm:grid grid-cols-1 sm:text-base sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:px-20 xl:px-28 sm:px-6 md:px-12 px-0 hidden">
        {features.map((feature, index) => {
          return (
            <SpotlightCard
              spotlightColor="rgba(0, 229, 255, 0.3)"
              key={index}
              className="sm:py-8 sm:px-6 xl:py-10 py-6 px-4 h-full">
              <div className="flex flex-col h-full">
                <div className="text-3xl mb-4 text-cyan-400">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-neutral-400 leading-relaxed  flex-grow">
                  {feature.description}
                </p>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
      <div className="grid grid-cols-1 sm:text-base sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:px-20 xl:px-28 sm:px-6 md:px-12 px-0 sm:hidden">
        {features.slice(0, 6).map((feature, index) => {
          return (
            <SpotlightCard
              spotlightColor="rgba(0, 229, 255, 0.3)"
              key={index}
              className="sm:py-8 sm:px-6 xl:py-10 py-6 px-4 h-full">
              <div className="flex flex-col h-full">
                <div className="text-3xl mb-4 text-cyan-400">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-neutral-400 leading-relaxed  flex-grow">
                  {feature.description}
                </p>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}
