export const metadata = {
  title: "About Us | ByteToBrain",
  description: "Learn more about ByteToBrain's mission, vision, and values.",
};

export default function AboutUs() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-[#2997FF]">About ByteToBrain</h1>
      <p className="text-lg text-[#C7C7CC] mb-6 text-center">
        <span className="font-semibold text-white">ByteToBrain</span> is a modern digital solutions company based in Bhopal, India. We specialize in transforming ideas into impactful web, mobile, and cloud products for startups, businesses, and entrepreneurs.
      </p>
      <div className="bg-[#232326] rounded-xl p-6 mb-6 shadow-lg flex items-center gap-4 border border-transparent hover:border-[#2997FF] transition-colors duration-200">
        <img src="/leadership.png" alt="Mission" className="w-14 h-14 md:w-20 md:h-20" />
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Our Mission</h2>
          <p className="text-[#C7C7CC]">To empower businesses and individuals with innovative, reliable, and scalable digital solutions that drive growth and success in the digital era.</p>
        </div>
      </div>
      <div className="bg-[#232326] rounded-xl p-6 mb-6 shadow-lg flex items-center gap-4 border border-transparent hover:border-[#2997FF] transition-colors duration-200">
        <img src="/opportunity.png" alt="Vision" className="w-14 h-14 md:w-20 md:h-20" />
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Our Vision</h2>
          <p className="text-[#C7C7CC]">To be a trusted technology partner for ambitious brands and entrepreneurs, delivering world-class products and experiences that make a difference.</p>
        </div>
      </div>
      <div className="bg-[#232326] rounded-xl p-6 mb-6 shadow-lg flex items-center gap-4 border border-transparent hover:border-[#2997FF] transition-colors duration-200">
        <img src="/customer (2).png" alt="Values" className="w-14 h-14 md:w-20 md:h-20" />
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Our Values</h2>
          <ul className="list-disc pl-6 text-[#C7C7CC] space-y-1">
            <li><span className="font-semibold text-white">Innovation:</span> We embrace creativity and new ideas in every project.</li>
            <li><span className="font-semibold text-white">Integrity:</span> We believe in transparency, honesty, and ethical business.</li>
            <li><span className="font-semibold text-white">Customer Focus:</span> Your success is our priority. We listen, adapt, and deliver.</li>
            <li><span className="font-semibold text-white">Quality:</span> We are committed to delivering robust, scalable, and beautiful solutions.</li>
          </ul>
        </div>
      </div>
      <div className="bg-[#232326] rounded-xl p-8 mb-6 shadow-xl border border-transparent flex flex-col items-center text-center hover:border-[#2997FF] transition-colors duration-200">
        <div className="w-12 h-1 bg-[#2997FF] rounded-full mb-4"></div>
        <h2 className="text-2xl font-bold text-[#2997FF] mb-4">Why Choose ByteToBrain?</h2>
        <ul className="list-disc pl-6 text-[#C7C7CC] space-y-2 text-left max-w-md mx-auto">
          <li>Experienced team of developers, designers, and strategists</li>
          <li>End-to-end solutions: from idea to launch and beyond</li>
          <li>Modern tech stack and best industry practices</li>
          <li>Transparent communication and on-time delivery</li>
          <li>Long-term partnership approach</li>
        </ul>
      </div>
    </div>
  );
} 