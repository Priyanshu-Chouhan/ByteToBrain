export const metadata = {
  title: "Cloud & Marketing | ByteToBrain",
  description: "Cloud migration, DevOps, and digital marketing solutions for your business.",
};

export default function CloudMarketing() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#18181b] via-[#232326] to-[#1e293b] flex flex-col items-center justify-center py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2997FF] via-[#A259FF] to-[#FF6F91] mb-12 text-center drop-shadow-lg">
        Cloud & Marketing
      </h1>
      {/* Cloud & DevOps Section */}
      <div id="cloud-devops" className="flex flex-col md:flex-row items-center gap-10 mb-16 w-full max-w-5xl scroll-mt-24">
        <img
          src="/cloud.png"
          alt="Cloud & DevOps"
          className="w-[500px] h-[420px] object-contain mb-6 md:mb-0 md:mr-8"
        />
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2997FF] mb-2">Cloud & DevOps</h2>
          <p className="text-base md:text-lg text-[#C7C7CC] mb-5">
            We provide cloud migration, scalable infrastructure, and DevOps automation to help your business scale and stay secure.
          </p>
          <ul className="text-base md:text-lg text-[#A259FF] space-y-2 font-medium pl-4 list-disc">
            <li>Cloud Migration (AWS, Azure, GCP)</li>
            <li>DevOps Automation & CI/CD</li>
            <li>Performance & Security Optimization</li>
            <li>Infrastructure as Code</li>
            <li>Ongoing Support & Monitoring</li>
          </ul>
        </div>
      </div>
      {/* Digital Marketing Section */}
      <div id="digital-marketing" className="flex flex-col md:flex-row-reverse items-center gap-10 w-full max-w-5xl scroll-mt-24">
        <img
          src="/Digita.png"
          alt="Digital Marketing"
          className="w-[500px] h-[420px] object-contain mb-6 md:mb-0 md:ml-8"
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