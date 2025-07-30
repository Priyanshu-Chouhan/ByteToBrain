export const metadata = {
  title: "UI/UX & Branding | ByteToBrain",
  description: "User-centric design and brand identity solutions for your business.",
};

export default function UIUXBranding() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#18181b] via-[#232326] to-[#1e293b] flex flex-col items-center justify-center py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2997FF] via-[#A259FF] to-[#FF6F91] mb-12 text-center drop-shadow-lg">
        UI/UX & Branding
      </h1>
      
      {/* UI/UX Design Section */}
      <div id="uiux-design" className="flex flex-col md:flex-row items-center gap-10 mb-16 w-full max-w-5xl scroll-mt-24">
        <img
          src="/web-design.png"
          alt="UI/UX Design"
          className="w-96 h-80 object-contain mb-6 md:mb-0 md:mr-8"
        />
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-[#A259FF] mb-2">UI/UX Design</h2>
          <p className="text-base md:text-lg text-[#C7C7CC] mb-5">
            User-centric, beautiful, and intuitive interfaces for web and mobile applications that enhance user experience and drive engagement.
          </p>
          <ul className="text-base md:text-lg text-[#2997FF] space-y-2 font-medium pl-4 list-disc">
            <li>Wireframes & Prototyping</li>
            <li>User Research & Testing</li>
            <li>Responsive Design</li>
            <li>Brand Consistency</li>
            <li>Interactive Design Systems</li>
          </ul>
        </div>
      </div>

      {/* Branding Section */}
      <div id="branding" className="flex flex-col md:flex-row-reverse items-center gap-10 w-full max-w-5xl scroll-mt-24">
        <img
          src="/brand.png"
          alt="Branding"
          className="w-96 h-80 object-contain mb-6 md:mb-0 md:ml-8"
        />
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-[#FF6F91] mb-2">Branding</h2>
          <p className="text-base md:text-lg text-[#C7C7CC] mb-5">
            Build a memorable brand identity with our creative team. From logo design to complete brand guidelines.
          </p>
          <ul className="text-base md:text-lg text-[#A259FF] space-y-2 font-medium pl-4 list-disc">
            <li>Logo Design & Identity</li>
            <li>Brand Guidelines</li>
            <li>Marketing Materials</li>
            <li>Rebranding Services</li>
            <li>Brand Strategy</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 
