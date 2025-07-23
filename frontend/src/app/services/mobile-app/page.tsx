export const metadata = {
  title: "Mobile App Development | ByteToBrain",
  description: "Android & iOS apps for your brand and customers.",
};

export default function MobileAppDevelopment() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#18181b] py-12 px-4">
      <img
        src="/mobile-development-illustration.png"
        alt="Mobile App Development"
        className="w-64 h-auto mb-8"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Mobile App Development</h1>
      <p className="text-lg text-[#C7C7CC] max-w-2xl text-center mb-6">
        We create modern, user-friendly Android & iOS apps to help your business reach more customers and deliver a seamless experience.
      </p>
      <ul className="text-[#2997FF] text-base space-y-2 mb-8">
        <li>• Cross-Platform (React Native/Flutter)</li>
        <li>• Smooth UX & Modern UI</li>
        <li>• API Integration & Push Notifications</li>
        <li>• App Store & Play Store Launch</li>
        <li>• Ongoing Support & Updates</li>
      </ul>
    </div>
  );
} 