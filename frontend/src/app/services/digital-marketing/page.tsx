export const metadata = {
  title: "Digital Marketing | ByteToBrain",
  description: "Grow your brand with SEO, social media, and digital campaigns.",
};

export default function DigitalMarketing() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#18181b] via-[#232326] to-[#1e293b] flex flex-col items-center justify-center py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6F91] via-[#2997FF] to-[#A259FF] mb-12 text-center drop-shadow-lg">
        Digital Marketing
      </h1>
      <div id="digital-marketing" className="flex flex-col md:flex-row items-center gap-10 w-full max-w-5xl scroll-mt-24">
        <img
          src="/digital-marketing.png"
          alt="Digital Marketing"
          className="w-96 h-80 object-contain mb-6 md:mb-0 md:mr-8"
        />
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-[#FF6F91] mb-2">Digital Marketing</h2>
          <p className="text-base md:text-lg text-[#C7C7CC] mb-5">
            Grow your brand with our expert digital marketing services—SEO, social media, and lead generation campaigns tailored for your business.
          </p>
          <ul className="text-base md:text-lg text-[#2997FF] space-y-2 font-medium pl-4 list-disc">
            <li>SEO & Content Marketing</li>
            <li>Social Media Management</li>
            <li>Lead Generation Campaigns</li>
            <li>Email Marketing</li>
            <li>Analytics & Reporting</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 