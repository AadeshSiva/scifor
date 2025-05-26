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
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-[477px] gap-2.5 text-white text-[28px] font-bold cursor-pointer bg-black hover:bg-gray-800 transition-colors mx-auto my-0 pt-[11px] pb-2.5 px-2.5 max-md:w-[300px] max-md:text-2xl max-sm:w-full max-sm:text-xl">
          Start
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Start Your Journey</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              placeholder="Enter your business name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              placeholder="Enter your industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Begin Assessment
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};