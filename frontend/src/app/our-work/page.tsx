export const metadata = {
  title: "Our Work | ByteToBrain",
  description: "Explore our portfolio of web development, mobile apps, and digital solutions.",
};

export default function OurWork() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      image: "/web-development-illustration.png",
      shortDescription: "Modern e-commerce solution with payment integration and admin dashboard.",
      technologies: ["React.js", "Node.js", "MongoDB", "Stripe"],
      liveDemo: "https://demo-ecommerce.bytetobrain.in",
      icon: "🛒"
    },
    {
      id: 2,
      title: "Mobile Banking App",
      image: "/mobile-development-illustration.png",
      shortDescription: "Secure mobile banking application with biometric authentication.",
      technologies: ["React Native", "Firebase", "Node.js", "PostgreSQL"],
      liveDemo: "https://demo-banking.bytetobrain.in",
      icon: "💳"
    },
    {
      id: 3,
      title: "Restaurant Management",
      image: "/programming.png",
      shortDescription: "Complete restaurant management with POS, inventory, and analytics.",
      technologies: ["Next.js", "Express.js", "MySQL", "Tailwind"],
      liveDemo: "https://demo-restaurant.bytetobrain.in",
      icon: "🍽️"
    },
    {
      id: 4,
      title: "Learning Management",
      image: "/web-design.png",
      shortDescription: "Online learning platform with video streaming and progress tracking.",
      technologies: ["React.js", "Node.js", "MongoDB", "AWS S3"],
      liveDemo: "https://demo-lms.bytetobrain.in",
      icon: "📚"
    },
    {
      id: 5,
      title: "Healthcare Portal",
      image: "/ui-ux.png",
      shortDescription: "Patient management system with appointment booking and telemedicine.",
      technologies: ["Vue.js", "Laravel", "MySQL", "WebRTC"],
      liveDemo: "https://demo-healthcare.bytetobrain.in",
      icon: "🏥"
    },
    {
      id: 6,
      title: "Real Estate Platform",
      image: "/app-development.png",
      shortDescription: "Property listing platform with virtual tours and mortgage calculator.",
      technologies: ["Angular", "Spring Boot", "PostgreSQL", "AWS"],
      liveDemo: "https://demo-realestate.bytetobrain.in",
      icon: "🏠"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#18181b] via-[#232326] to-[#1e293b] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2997FF] via-[#A259FF] to-[#FF6F91] mb-4">
            Our Work
          </h1>
          <p className="text-lg md:text-xl text-[#C7C7CC] max-w-3xl mx-auto">
            Discover our portfolio of innovative digital solutions that have helped businesses grow and succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="group cursor-pointer transform hover:scale-105 hover:-rotate-1 transition-all duration-500"
              style={{
                height: "320px",
                animationDelay: `${index * 200}ms`
              }}
            >
              <div className="relative h-full overflow-hidden rounded-3xl shadow-2xl border border-[#2997FF]/20 hover:border-[#2997FF]/60 hover:shadow-[#2997FF]/20 hover:shadow-2xl transition-all duration-500">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2997FF]/60 via-transparent to-[#A259FF]/30 opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <div className="w-14 h-14 bg-gradient-to-r from-[#2997FF] to-[#A259FF] rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg animate-bounce group-hover:animate-pulse">
                    {project.icon}
                  </div>

                </div>
                
                <div className="absolute top-1/2 right-4 w-2 h-2 bg-[#2997FF] rounded-full animate-ping"></div>
                <div className="absolute top-1/3 left-6 w-1 h-1 bg-[#A259FF] rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/3 right-8 w-1.5 h-1.5 bg-[#FF6F91] rounded-full animate-bounce"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold text-xl mb-3 drop-shadow-lg group-hover:text-[#2997FF] transition-colors duration-300">{project.title}</h3>
                  <p className="text-gray-100 text-sm mb-4 leading-relaxed drop-shadow-md opacity-90 group-hover:opacity-100 transition-opacity duration-300">{project.shortDescription}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-gradient-to-r from-[#2997FF]/20 to-[#A259FF]/20 backdrop-blur-sm text-white text-xs rounded-full border border-[#2997FF]/40 hover:scale-110 transition-transform duration-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <a 
                    href={project.liveDemo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2997FF] to-[#A259FF] text-white font-semibold text-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <img src="/live.png" alt="Live" className="w-8 h-8 animate-pulse" /> View Live
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-[#C7C7CC] mb-4">
            Have a project in mind? Let's bring your ideas to life.
          </p>
          <a href="/contact" className="inline-block px-8 py-3 bg-[#232326] text-white rounded-full font-semibold border border-[#2997FF] hover:bg-[#2997FF] transition">
            Start Your Project
          </a>
        </div>
      </div>
    </div>
  );
}