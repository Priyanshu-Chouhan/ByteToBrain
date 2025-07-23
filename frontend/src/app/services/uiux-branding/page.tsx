export const metadata = {
  title: "UI/UX & Branding | ByteToBrain",
  description: "User-centric, beautiful, and intuitive interfaces for web and mobile. Build your brand with us.",
};

export default function UIUXBranding() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#18181b] via-[#232326] to-[#1e293b] flex flex-col items-center justify-center py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#A259FF] via-[#2997FF] to-[#FF6F91] mb-12 text-center drop-shadow-lg">
        UI/UX & Branding
      </h1>
      {/* UI/UX Design Section */}
      <div id="uiux-design" className="flex flex-col md:flex-row items-center gap-10 mb-16 w-full max-w-5xl scroll-mt-24">
        <img
          src="/ui-ux.png"
          alt="UI/UX Illustration"
          className="w-96 h-80 object-contain mb-6 md:mb-0 md:mr-8"
        />
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-[#A259FF] mb-2">UI/UX Design</h2>
          <p className="text-base md:text-lg text-[#C7C7CC] mb-5">
            We design user-centric, beautiful, and intuitive interfaces for web and mobile. Our UI/UX services ensure your product is easy to use and visually appealing.
          </p>
          <ul className="text-base md:text-lg text-[#2997FF] space-y-2 font-medium pl-4 list-disc">
            <li>Wireframes & Prototyping</li>
            <li>Modern, Trendy UI</li>
            <li>UX Research & Testing</li>
            <li>Responsive Design</li>
            <li>Interaction Design</li>
          </ul>
        </div>
      </div>
      {/* Branding Section */}
      <div id="branding" className="flex flex-col md:flex-row-reverse items-center gap-10 w-full max-w-5xl scroll-mt-24">
        <img
          src="/badge.png"
          alt="Branding"
          className="w-96 h-80 object-contain mb-6 md:mb-0 md:ml-8"
        />
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-[#FF6F91] mb-2">Branding</h2>
          <p className="text-base md:text-lg text-[#C7C7CC] mb-5">
            Build a memorable brand identity with our creative team. We help you stand out and connect with your audience through consistent and impactful branding.
          </p>
          <ul className="text-base md:text-lg text-[#A259FF] space-y-2 font-medium pl-4 list-disc">
            <li>Brand Identity & Logo Design</li>
            <li>Consistent Visual Language</li>
            <li>Brand Guidelines</li>
            <li>Rebranding</li>
            <li>Marketing Collateral</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 