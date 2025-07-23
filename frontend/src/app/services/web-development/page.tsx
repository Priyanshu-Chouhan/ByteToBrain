export const metadata = {
  title: "Web & Mobile App Development | ByteToBrain",
  description: "Custom websites, web apps, and mobile apps to boost your business online.",
};

export default function WebAndMobileDevelopment() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#18181b] via-[#232326] to-[#1e293b] flex flex-col items-center justify-center py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2997FF] via-[#A259FF] to-[#FF6F91] mb-12 text-center drop-shadow-lg">
        Web & Mobile App Development
      </h1>
      {/* Web Development Section */}
      <div className="flex flex-col md:flex-row items-center gap-10 mb-16 w-full max-w-5xl">
        <img
          src="/web-development-illustration.png"
          alt="Web Development"
          className="w-96 h-80 object-contain mb-6 md:mb-0 md:mr-8"
        />
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2997FF] mb-2">Web Development</h2>
          <p className="text-base md:text-lg text-[#C7C7CC] mb-5">
            We build custom, scalable, and SEO-ready websites and web apps for startups and businesses. Our solutions are fast, secure, and tailored to your needs.
          </p>
          <ul className="text-base md:text-lg text-[#FF6F91] space-y-2 font-medium pl-4 list-disc">
            <li>Responsive & Mobile-First Design</li>
            <li>MERN Stack & Next.js Experts</li>
            <li>SEO & Performance Optimized</li>
            <li>Admin Dashboard & Analytics</li>
            <li>Ongoing Support & Maintenance</li>
          </ul>
        </div>
      </div>
      {/* Mobile App Development Section */}
      <div id="mobile-app" className="flex flex-col md:flex-row-reverse items-center gap-10 w-full max-w-5xl scroll-mt-24">
        <img
          src="/mobile-development-illustration.png"
          alt="Mobile App Development"
          className="w-96 h-80 object-contain mb-6 md:mb-0 md:ml-8"
        />
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-[#A259FF] mb-2">Mobile App Development</h2>
          <p className="text-base md:text-lg text-[#C7C7CC] mb-5">
            We create modern, user-friendly Android & iOS apps to help your business reach more customers and deliver a seamless experience.
          </p>
          <ul className="text-base md:text-lg text-[#2997FF] space-y-2 font-medium pl-4 list-disc">
            <li>Cross-Platform (React Native/Flutter)</li>
            <li>Smooth UX & Modern UI</li>
            <li>API Integration & Push Notifications</li>
            <li>App Store & Play Store Launch</li>
            <li>Ongoing Support & Updates</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 