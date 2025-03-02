const Hero = () => {
  return (
    <section className="pt-[7rem] max-container padding-x flex items-center justify-center">
      <div className="flex items-center flex-col">
        <img src="/assets/svg/AI-feat.svg" className="z-20" alt="AI-feat" />
        <h1 className="text-[60px] text-center font-bold leading-[120%] relative pt-4">
          <span className="bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
            Discover endless possibilities in the world of Trading
          </span>
        </h1>
        <p className="text-[#A6AAB2] text-center max-w-[818px] w-full text-[18px] font-medium pt-4">
          Step into the world of trading excellence and seize every opportunity
          with our advanced platform, expert guidance, and strategic insights
          for unrivaled financial success.
        </p>
        <img
          src="/assets/svg/hero-feat.svg"
          alt="hero-feat"
          className="object-contain pt-4"
        />

        <div className="z-20 mt-4">
          <img
            src="/assets/svg/hero-cta1.svg"
            alt="hero-cta1"
            className="object-contain cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
