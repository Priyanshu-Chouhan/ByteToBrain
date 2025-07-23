"use client";
import React, { useState } from 'react';

const queryTypes = [
  'Project Inquiry',
  'Support',
  'Feedback',
  'Partnership',
  'Other',
];

const ContactForm: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', queryType: '', message: '', file: null as File | null });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setForm({ ...form, file: (e.target as HTMLInputElement).files?.[0] || null });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add contact logic here
    setSuccess(true);
    setForm({ name: '', email: '', phone: '', queryType: '', message: '', file: null });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg mx-auto bg-[#18181b] p-8 rounded-2xl shadow-2xl border border-[#232326]">
      <h2 className="text-2xl font-bold mb-2 text-center text-white">Contact</h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-white font-medium">Name</label>
        <input name="name" id="name" type="text" placeholder="Your Name" value={form.name} onChange={handleChange} className="border border-[#232326] bg-[#232326] text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#2997FF]" required />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-white font-medium">Email</label>
        <input name="email" id="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} className="border border-[#232326] bg-[#232326] text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#2997FF]" required />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="text-white font-medium">Phone <span className="text-gray-400 font-normal">(optional)</span></label>
        <input name="phone" id="phone" type="tel" placeholder="Your Phone Number" value={form.phone} onChange={handleChange} className="border border-[#232326] bg-[#232326] text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#2997FF]" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="queryType" className="text-white font-medium">Query Type</label>
        <select name="queryType" id="queryType" value={form.queryType} onChange={handleChange} className="border border-[#232326] bg-[#232326] text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#2997FF]" required>
          <option value="">Select a query type</option>
          {queryTypes.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-white font-medium">Message</label>
        <textarea name="message" id="message" placeholder="How can we help you?" value={form.message} onChange={handleChange} className="border border-[#232326] bg-[#232326] text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#2997FF] min-h-[100px]" required />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="file" className="text-white font-medium">Attach File <span className="text-gray-400 font-normal">(optional)</span></label>
        <input name="file" id="file" type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={handleChange} className="text-white" />
      </div>
      <button type="submit" className="bg-[#2997FF] text-white py-2 rounded-full font-semibold hover:bg-[#0071E3] transition">Send Message</button>
      {success && <div className="text-green-400 text-center">Thank you! Your message has been sent. We usually reply within 1 hour.</div>}
      <div className="text-xs text-gray-400 text-center mt-2">Your info is safe with us. We never share your details.</div>
      <div className="flex justify-center gap-4 mt-4">
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=rachanasen1999@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:underline">
          <img src="/gmail.png" alt="Gmail" className="w-6 h-6" /> Email Us
        </a>
        <a href="https://wa.me/918269028823" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-400 hover:underline">
          <img src="/whatsapp.png" alt="WhatsApp" className="w-6 h-6" /> WhatsApp
        </a>
      </div>
    </form>
  );
};

export default ContactForm; 