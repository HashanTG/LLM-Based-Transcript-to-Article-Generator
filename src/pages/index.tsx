import React, { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { ContentProcessor } from "@/components/ContentProcessor";

const Index = () => {
  const [showProcessor, setShowProcessor] = useState(false);

  return (
    <div className="min-h-screen">
      {!showProcessor ? (
        <HeroSection onGetStarted={() => setShowProcessor(true)} />
      ) : (
        <ContentProcessor />
      )}
    </div>
  );
};

export default Index;
