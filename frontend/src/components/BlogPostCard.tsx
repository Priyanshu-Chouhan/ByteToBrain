import React from 'react';

interface BlogPostCardProps {
  title: string;
  summary: string;
  author: string;
  date: string;
  link?: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ title, summary, author, date, link }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col max-w-xs">
    <div className="font-bold text-lg mb-1">{title}</div>
    <div className="text-gray-700 mb-2">{summary}</div>
    <div className="text-sm text-gray-500 mb-2">By {author} on {date}</div>
    {link && <a href={link} className="text-blue-600 hover:underline">Read More</a>}
  </div>
);

export default BlogPostCard; 