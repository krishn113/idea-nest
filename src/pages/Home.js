import React from 'react';
import KeyFeatures from '../components/keyfeatures';

const HeroSection = () => {
  return (
<section className="relative bg-gray-900">
  <div className="container mx-auto px-6 lg:px-20 py-20 text-center lg:text-left relative z-10">
    <div className="flex flex-col lg:flex-row items-center lg:justify-between">
      {/* Text Content */}
      <div className="max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
          Where Great Ideas Hatch and Thrive
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          ideaNest connects innovators with the tools and community to bring their ideas to life.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
          <button
          className="btn-hero-pink"
          onClick={() => (window.location.href = `/register`)}
          >
          Start Your Journey
          </button>
          <button
          className="btn-hero-white"
          onClick={() => (window.location.href = `/explore`)}
          >
          Explore Ideas
          </button>
        </div>
      </div>
    </div>
  </div>
    <KeyFeatures />
</section>
  );
};

export default HeroSection;

  