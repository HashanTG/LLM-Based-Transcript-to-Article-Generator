// components/LandingPage.tsx
import React from "react";
import { motion } from "framer-motion";
import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

// Reusable Feature Card
interface FeatureCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <motion.div
    className="flex flex-col items-center text-center p-8 bg-gray-900/80 backdrop-blur-md rounded-2xl border border-gray-700 hover:border-purple-500 transition-colors duration-300 shadow-lg"
    whileHover={{ y: -6, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 250 }}
  >
    <div className="text-4xl mb-4 text-purple-400">{icon}</div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-400">{description}</p>
  </motion.div>
);

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white font-sans overflow-y-scroll scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gradient-to-b scrollbar-thumb-blue-500/80 hover:scrollbar-thumb-purple-600/80">
      <div className="flex justify-center items-center w-full">
        <div className="w-full max-w-7xl py-40 flex flex-col items-center text-center">
          <motion.p
            className="text-base md:text-lg text-gray-400 mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Transform any content into articles with AI
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            AI Content Processor
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Upload PDFs, paste website links, or share YouTube videos. Our AI
            instantly extracts content and generates engaging, tailored
            articles.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col md:flex-row gap-4 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              onClick={() => navigate("/content")}
              className="px-8 py-3 text-lg font-semibold rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-md hover:from-blue-600 hover:to-purple-700 active:scale-95 transition-transform"
              variants={itemVariants}
            >
              🚀 Start Processing
            </motion.button>
            <motion.button
              className="px-8 py-3 text-lg font-semibold rounded-full border border-gray-700 bg-gray-800 hover:bg-gray-700 active:scale-95 transition-all"
              variants={itemVariants}
            >
              🎥 View Demo
            </motion.button>
          </motion.div>

          {/* Features */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <FeatureCard
                icon={<span>📄</span>}
                title="Multi-Source Input"
                description="Process PDFs, websites, and YouTube videos seamlessly."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <FeatureCard
                icon={<span>🤖</span>}
                title="AI-Powered Generation"
                description="Create engaging 300-word articles instantly."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <FeatureCard
                icon={<span>⚡</span>}
                title="Custom Prompts"
                description="Guide AI with tailored instructions for better results."
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
