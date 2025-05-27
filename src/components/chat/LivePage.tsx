import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const StartForm: React.FC = () => {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Start process:', { businessName, industry });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-[400px] gap-2.5 text-white text-2xl font-bold cursor-pointer bg-black hover:bg-gray-800 transition-colors mx-auto my-0 py-3 px-2.5 max-md:w-[280px] max-md:text-xl max-sm:w-full max-sm:text-lg">
          Start
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Start Your Journey</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
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
          <Button onClick={handleSubmit} className="w-full">
            Begin Assessment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const HeroSection: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-2">
      <article className="text-center max-w-2xl w-full">
      <aside className="absolute right-4 top-4 z-10">
      <div className="flex flex-col items-end">
        <img
          src='https://cdn.builder.io/api/v1/image/assets/TEMP/53e157ea9e6912d2bf3a95839b06656d5dc44abc'
          alt="Side Logo"
          className="w-[140px] h-[35px]"
        />
        <div className="-rotate-90 text-black text-[18px] mt-5 origin-center whitespace-nowrap pt-40 font-linear">
          <span>Grow Smarter. <span className="font-bold">Exit Richer™</span></span>
        </div>
      </div>
    </aside>
        <section className="mb-8">
          <h1 className="text-[#7F7F7F] text-5xl font-normal mb-3 max-md:text-3xl max-sm:text-2xl leading-tight font-walbaum">
            Your ONE and ONLY place to:
            <span className="block text-black">grow to exit richer.</span>
          </h1>
          
          <h2 className="text-black text-xl font-bold mb-4 max-md:text-lg max-sm:text-base">
            84%+ of your business value (PWC) is hidden inside your intangibles.
          </h2>
          
          <p className="text-[#595959] text-center text-lg font-normal mb-6 max-md:text-base max-sm:text-sm">
            Warren Buffet doesn't have a solution for maximizing and monetizing
            intangibles because we have yet to tell him about ​the that we invented
            in 1996.​
          </p>
          
          <div className="text-black text-center text-lg font-bold mb-6 max-md:text-base max-sm:text-sm">
            <p>While we have other client successes, ​</p>
            <p>Jeff was the only one that sold a UPh-based company.​</p>
          </div>
        </section>

        <section className="text-[#9D0D19] mb-8 mx-20">
          <p className="text-lg font-normal mb-2 max-md:text-base max-sm:text-sm ">
            If you haven't found a way to ​unlock 84% of YOUR business value
          </p>
          <p className="text-lg font-normal mb-6 max-md:text-base max-sm:text-sm font-semibold">
            you may not get paid for <span className="underline">all</span> or{' '}
            <span className="underline">any of it</span>.
          </p>
        </section>

        <section className="text-center">
          <h2 className="text-[#7F7F7F] text-5xl font-normal mb-4 max-md:text-3xl max-sm:text-2xl leading-tight font-walbaum">
            Your business dream​
            <span className="block">comes true</span>
            <span className="text-black">here and now</span>.
          </h2>
          
          <StartForm />
        </section>
      </article>
    </div>
  );
};