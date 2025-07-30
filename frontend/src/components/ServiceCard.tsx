import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  link?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, link }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center max-w-xs min-h-[280px] sm:min-h-[320px]">
    <div className="text-3xl mb-2">{icon}</div>
    <div className="font-bold text-lg mb-1">{title}</div>
    <div className="text-gray-700 mb-2 flex-1">{description}</div>
    {link && <a href={link} className="text-blue-600 hover:underline mt-auto">Learn more</a>}
  </div>
);

export default ServiceCard; 