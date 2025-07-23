import React from 'react';

interface TestimonialProps {
  name: string;
  role: string;
  message: string;
  image?: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ name, role, message, image }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center max-w-xs">
    {image && <img src={image} alt={name} className="w-16 h-16 rounded-full mb-2 object-cover" />}
    <div className="font-bold text-lg mb-1">{name}</div>
    <div className="text-sm text-gray-500 mb-2">{role}</div>
    <div className="text-gray-700 italic">"{message}"</div>
  </div>
);

export default TestimonialCard; 