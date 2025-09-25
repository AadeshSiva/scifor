const StartForm = ({ setDisplay, showHero }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setDisplay("chat");
    showHero(false);
  };
  return (
    <>
      <button
        className="w-full max-w-[400px] gap-2.5 text-white text-xl md:text-2xl font-bold cursor-pointer bg-black hover:bg-gray-800 transition-colors mx-auto my-0 py-3 px-4 sm:px-6"
        onClick={handleSubmit}
      >
        Start
      </button>
    </>
  );
};
export const HeroSection = ({ setDisplay, showHero }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      <article className="text-center max-w-4xl w-full">
        <aside className="absolute right-4 top-24 z-10 hidden lg:block">
          <div className="flex flex-col items-end">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/53e157ea9e6912d2bf3a95839b06656d5dc44abc"
              alt="Side Logo"
              className="w-[140px] h-[35px]"
            />
            <div className="-rotate-90 text-black text-[18px] mt-5 origin-center whitespace-nowrap pt-40 font-linear">
              <span>
                Grow Smarter. <span className="font-bold">Exit Richer™</span>
              </span>
            </div>
          </div>
        </aside>
        <section className="mb-8">
          <h1 className="text-[#7F7F7F] text-3xl sm:text-4xl lg:text-5xl font-normal mb-3 leading-tight font-walbaum">
            Your ONE and ONLY place to:
            <span className="block text-black">grow to exit richer.</span>
          </h1>
          <h2 className="text-black text-base sm:text-lg lg:text-xl font-bold mb-4">
            84%+ of your business value (PWC) is hidden inside your intangibles.
          </h2>
          <p className="text-[#595959] text-center text-sm sm:text-base lg:text-lg font-normal mb-6 px-2">
            Warren Buffet doesn't have a solution for maximizing and monetizing
            intangibles because we have yet to tell him about ​the that we
            invented in 1996.​
          </p>
          <div className="text-black text-center text-sm sm:text-base lg:text-lg font-bold mb-6 px-2">
            <p>While we have other client successes, ​</p>
            <p>Jeff was the only one that sold a UPh-based company.​</p>
          </div>
        </section>
        <section className="text-[#9D0D19] mb-8 px-4 sm:px-8 lg:px-20">
          <p className="text-sm sm:text-base lg:text-lg font-normal mb-2">
            If you haven't found a way to ​unlock 84% of YOUR business value
          </p>
          <p className="text-sm sm:text-base lg:text-lg font-normal mb-6 font-semibold">
            you may not get paid for <span className="underline">all</span> or{" "}
            <span className="underline">any of it</span>.
          </p>
        </section>
        <section className="text-center px-4">
          <h2 className="text-[#7F7F7F] text-3xl sm:text-4xl lg:text-5xl font-normal mb-4 leading-tight font-walbaum">
            Your business dream​
            <span className="block">comes true</span>
            <span className="text-black">here and now</span>.
          </h2>
          <div className="flex justify-center">
            <StartForm setDisplay={setDisplay} showHero={showHero} />
          </div>
        </section>
      </article>
    </div>
  );
};
