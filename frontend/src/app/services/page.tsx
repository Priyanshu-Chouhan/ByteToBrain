export const metadata = {
  title: "Our Services | ByteToBrain",
  description: "Explore our web, mobile, and digital solutions for your business.",
};

export default function ServicesHome() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#18181b] via-[#232326] to-[#1e293b] flex flex-col items-center justify-center py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2997FF] via-[#A259FF] to-[#FF6F91] mb-8 text-center drop-shadow-lg">
        Our Services
      </h1>
      <p className="text-lg md:text-xl text-[#C7C7CC] max-w-2xl text-center mb-12">
        We help startups and businesses grow with modern web and mobile solutions. Choose a service to learn more about how we can help you succeed online.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
        {/* Web & Mobile Card */}
        <div className="bg-[#232326]/80 rounded-2xl shadow-xl p-8 flex flex-col items-center border border-[#2997FF]/30">
          <img src="/web-development-illustration.png" alt="Web & Mobile Development" className="w-32 h-auto mb-4 rounded-xl shadow border-2 border-[#2997FF]/40" />
          <h2 className="text-2xl font-bold text-[#2997FF] mb-2">Web & Mobile App Development</h2>
          <p className="text-base text-[#C7C7CC] mb-4 text-center">
            Custom websites, web apps, and mobile apps built for performance, security, and growth. One team for all your digital needs.
          </p>
          <a href="/services/web-development" className="mt-2 px-6 py-2 bg-gradient-to-r from-[#2997FF] via-[#A259FF] to-[#FF6F91] text-white rounded-full font-semibold shadow hover:scale-105 transition">Learn More</a>
        </div>
        {/* Placeholder for future services or another card */}
        <div className="bg-[#232326]/60 rounded-2xl shadow-xl p-8 flex flex-col items-center border border-[#A259FF]/20 opacity-60">
          <img src="/mobile-development-illustration.png" alt="More Services Coming Soon" className="w-32 h-auto mb-4 rounded-xl shadow border-2 border-[#A259FF]/30" />
          <h2 className="text-2xl font-bold text-[#A259FF] mb-2">More Services Coming Soon</h2>
          <p className="text-base text-[#C7C7CC] mb-4 text-center">
            Stay tuned for new digital solutions and offerings from ByteToBrain.
          </p>
        </div>
      </div>
    </div>
  );
} 