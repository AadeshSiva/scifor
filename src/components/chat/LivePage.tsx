import React from 'react';
import { StartForm } from '@/components/ui/StartForm';

export const HeroSection: React.FC = () => {
  return (
    <article className="text-center">
      <section className="mb-20">
        <h1 className="text-[#7F7F7F] text-[53px] font-normal mb-5 max-md:text-4xl max-sm:text-[28px]">
          Your ONE and ONLY place to:
          <span className="block text-black">grow to exit richer.</span>
        </h1>
        
        <h2 className="text-black text-2xl font-bold mb-[30px] max-md:text-lg max-sm:text-base">
          84%+ of your business value (PWC) is hidden inside your intangibles.​
        </h2>
        
        <p className="text-[#595959] text-center text-2xl font-normal mb-[50px] max-md:text-lg max-sm:text-base">
          Warren Buffet doesn't have a solution for ​maximizing and monetizing
          intangibles because we have yet to tell him about ​the that we invented
          in 1996.​
        </p>
        
        <div className="text-black text-center text-2xl font-bold mb-10 max-md:text-lg max-sm:text-base">
          <p>While we have other client successes, ​</p>
          <p>Jeff was the only one that sold a UPh-based company.​</p>
        </div>
      </section>

      <section className="text-[#9D0D19] mb-20">
        <p className="text-2xl font-normal mb-5 max-md:text-lg max-sm:text-base">
          If you haven't found a way to ​unlock 84% of YOUR business value
        </p>
        <p className="text-2xl font-normal mb-[50px] max-md:text-lg max-sm:text-base">
          you may not get paid for <span className="underline">all</span> or{' '}
          <span className="underline">any of it</span>.
        </p>
      </section>

      <section className="text-center mt-[100px]">
        <h2 className="text-[#7F7F7F] text-[53px] font-normal mb-2.5 max-md:text-4xl max-sm:text-[28px]">
          Your business dream​
          <span className="block">comes true</span>
          <span className="text-black">here and now</span>.
        </h2>
        
        <StartForm />
      </section>
    </article>
  );
};