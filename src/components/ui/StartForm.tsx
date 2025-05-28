import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const StartForm: React.FC = () => {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle start process logic here
    console.log('Start process:', { businessName, industry });
  };

  return (
    <div className="pt-24 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg">
        <Dialog>
          <DialogTrigger asChild>
            <button className="w-full max-w-[477px] mx-auto block text-white font-bold cursor-pointer bg-black hover:bg-gray-800 transition-colors py-3 px-6 rounded-none
              text-2xl sm:text-3xl lg:text-[28px]
              min-h-[60px] sm:min-h-[70px] lg:min-h-[80px]
              focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
              Start
            </button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-[425px] mx-auto">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl">Start Your Journey</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-sm sm:text-base">
                  Business Name
                </Label>
                <Input
                  id="businessName"
                  placeholder="Enter your business name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                  className="w-full text-sm sm:text-base py-2 sm:py-3"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-sm sm:text-base">
                  Industry
                </Label>
                <Input
                  id="industry"
                  placeholder="Enter your industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  required
                  className="w-full text-sm sm:text-base py-2 sm:py-3"
                />
              </div>
              <Button 
                onClick={handleSubmit}
                className="w-full py-3 sm:py-4 text-sm sm:text-base font-semibold mt-6"
              >
                Begin Assessment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};