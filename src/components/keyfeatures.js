import React from 'react';
import { FaLightbulb, FaUsers, FaRocket } from 'react-icons/fa';

const KeyFeatures = () => {
  const features = [
    {
      icon: <FaLightbulb className="text-pink-600 w-12 h-12" />,
      title: 'Innovative Ideas',
      description: 'Discover and share groundbreaking ideas that shape the future.',
    },
    {
      icon: <FaUsers className="text-pink-600 w-12 h-12" />,
      title: 'Collaborative Community',
      description: 'Engage with a vibrant community of creators and innovators.',
    },
    {
      icon: <FaRocket className="text-pink-600 w-12 h-12" />,
      title: 'Accelerate Growth',
      description: 'Access tools and resources to bring your ideas to life faster.',
    },
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-6 lg:px-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Key Features</h2>
        <p className="mt-4 text-gray-600">
          Empowering your creativity with tools, community, and resources.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
            >
              <div>{feature.icon}</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyFeatures;
