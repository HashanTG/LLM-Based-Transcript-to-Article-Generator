import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Zap, Brain, FileText } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Hero Title */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-white/20 text-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            Transform any content into articles with AI
          </div>

          <h1 className="text-5xl md:text-7xl font-bold gradient-text leading-tight">
            AI Content
            <br />
            <span className="text-foreground">Processor</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Upload PDFs, paste website links, or share YouTube videos. Our AI
            instantly extracts content and generates engaging articles tailored
            to your needs.
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="gradient"
            size="lg"
            className="text-lg px-8 py-6 h-auto"
            onClick={onGetStarted}
          >
            <Zap className="w-5 h-5 mr-2" />
            Start Processing
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <Button
            variant="glass"
            size="lg"
            className="text-lg px-8 py-6 h-auto"
          >
            <FileText className="w-5 h-5 mr-2" />
            View Demo
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card className="glass-card hover:glow-effect smooth-transition">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Multi-Source Input</h3>
              <p className="text-muted-foreground text-sm">
                Process PDFs, websites, and YouTube videos seamlessly
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card hover:glow-effect smooth-transition">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">AI-Powered Generation</h3>
              <p className="text-muted-foreground text-sm">
                Advanced LLM creates engaging 300-word articles
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card hover:glow-effect smooth-transition">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Custom Prompts</h3>
              <p className="text-muted-foreground text-sm">
                Guide AI with custom instructions for perfect results
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 pt-8 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold gradient-text">3</div>
            <div className="text-sm text-muted-foreground">Input Sources</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold gradient-text">300</div>
            <div className="text-sm text-muted-foreground">Word Articles</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold gradient-text">∞</div>
            <div className="text-sm text-muted-foreground">Possibilities</div>
          </div>
        </div>
      </div>
    </div>
  );
};
