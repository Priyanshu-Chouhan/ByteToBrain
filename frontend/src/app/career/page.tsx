export const metadata = {
  title: "Careers | ByteToBrain",
  description: "Join our team and build amazing digital solutions together.",
};

export default function Career() {
  const jobs = [
    {
      id: 1,
      title: "MERN Stack Developer",
      type: "Full-time",
      location: "Remote",
      status: "Open",
      deadline: "2025-02-15",
      technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "JavaScript", "TypeScript"],
      description: "We are looking for a skilled MERN Stack Developer to join our team and build scalable web applications.",
      requirements: [
        "2+ years experience with MERN stack",
        "Strong knowledge of JavaScript/TypeScript",
        "Experience with RESTful APIs",
        "Knowledge of Git version control"
      ],
      image: "/mern.webp"
    },
    {
      id: 2,
      title: "React.js Developer",
      type: "Full-time",
      location: "Hybrid",
      status: "Open",
      deadline: "2025-02-20",
      technologies: ["React.js", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS"],
      description: "Join our frontend team to create beautiful and responsive user interfaces using React.js.",
      requirements: [
        "3+ years experience with React.js",
        "Experience with Next.js framework",
        "Strong CSS and responsive design skills",
        "Knowledge of state management (Redux/Context API)"
      ],
      image: "/react.png"
    },
    {
      id: 3,
      title: "Node.js Backend Developer",
      type: "Full-time",
      location: "Remote",
      status: "Open",
      deadline: "2025-02-25",
      technologies: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "AWS"],
      description: "Build robust backend systems and APIs to power our web and mobile applications.",
      requirements: [
        "2+ years experience with Node.js",
        "Experience with databases (MongoDB/PostgreSQL)",
        "Knowledge of cloud services (AWS/Azure)",
        "Understanding of microservices architecture"
      ],
      image: "/nodejs.png"
    },
    {
      id: 4,
      title: "UI/UX Designer",
      type: "Full-time",
      location: "Hybrid",
      status: "Open",
      deadline: "2025-03-01",
      technologies: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Sketch"],
      description: "Create stunning user experiences and interfaces for web and mobile applications.",
      requirements: [
        "2+ years experience in UI/UX design",
        "Proficiency in Figma and Adobe Creative Suite",
        "Strong portfolio showcasing design work",
        "Understanding of user-centered design principles"
      ],
      image: "/paint-palette.png"
    },
    {
      id: 5,
      title: "Digital Marketing Specialist",
      type: "Full-time",
      location: "Remote",
      status: "Open",
      deadline: "2025-03-05",
      technologies: ["Google Ads", "Facebook Ads", "SEO", "Analytics", "Content Marketing"],
      description: "Drive growth through digital marketing strategies and campaigns across multiple channels.",
      requirements: [
        "2+ years experience in digital marketing",
        "Experience with Google Ads and social media advertising",
        "Knowledge of SEO and content marketing",
        "Analytics and data-driven approach"
      ],
      image: "/social-media.png"
    },
    {
      id: 6,
      title: "Mobile App Developer",
      type: "Full-time",
      location: "Hybrid",
      status: "Closing Soon",
      deadline: "2025-01-31",
      technologies: ["React Native", "Flutter", "iOS", "Android", "Firebase"],
      description: "Develop cross-platform mobile applications for iOS and Android platforms.",
      requirements: [
        "2+ years experience in mobile app development",
        "Experience with React Native or Flutter",
        "Knowledge of mobile app deployment",
        "Understanding of mobile UI/UX principles"
      ],
      image: "/app-development.png"
    },
    {
      id: 7,
      title: "Java Developer",
      type: "Full-time",
      location: "Hybrid",
      status: "Open",
      deadline: "2025-03-10",
      technologies: ["Java", "Spring Boot", "MySQL", "Maven", "REST APIs", "Microservices"],
      description: "Develop enterprise-level applications using Java and Spring framework for our clients.",
      requirements: [
        "3+ years experience with Java development",
        "Experience with Spring Boot framework",
        "Knowledge of database design and SQL",
        "Understanding of microservices architecture"
      ],
      image: "/java.png"
    },
    {
      id: 8,
      title: "Business Development Executive",
      type: "Full-time",
      location: "On-site",
      status: "Open",
      deadline: "2025-03-15",
      technologies: ["CRM", "Sales", "Lead Generation", "Client Relations", "Market Research"],
      description: "Drive business growth by identifying new opportunities and building strong client relationships.",
      requirements: [
        "2+ years experience in business development",
        "Strong communication and negotiation skills",
        "Experience with CRM tools",
        "Proven track record in sales and lead generation"
      ],
      image: "/customer (2).png"
    },
    {
      id: 9,
      title: "DevOps Engineer",
      type: "Full-time",
      location: "Remote",
      status: "Open",
      deadline: "2025-03-20",
      technologies: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Linux"],
      description: "Manage cloud infrastructure and automate deployment processes for scalable applications.",
      requirements: [
        "2+ years experience with cloud platforms (AWS/Azure)",
        "Experience with containerization (Docker/Kubernetes)",
        "Knowledge of CI/CD pipelines",
        "Strong Linux administration skills"
      ],
      image: "/devops.png"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "text-green-500 bg-green-500/10";
      case "Closing Soon": return "text-orange-500 bg-orange-500/10";
      case "Closed": return "text-red-500 bg-red-500/10";
      default: return "text-gray-500 bg-gray-500/10";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#18181b] via-[#232326] to-[#1e293b] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2997FF] via-[#A259FF] to-[#FF6F91] mb-4">
            Join Our Team
          </h1>
          <p className="text-lg md:text-xl text-[#C7C7CC] max-w-3xl mx-auto">
            Build the future of digital solutions with us. We're looking for passionate individuals to join our growing team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div key={job.id} className="bg-[#232326]/80 rounded-2xl shadow-xl p-6 border border-[#2997FF]/20 hover:border-[#2997FF]/40 transition-all duration-300 hover:scale-105 h-[480px] flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <img src={job.image} alt={job.title} className="w-12 h-12 rounded-lg" />
                <div>
                  <h3 className="text-xl font-bold text-white">{job.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-[#A1A1A6]">
                    <span>{job.type}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(job.status)}`}>
                  {job.status}
                </span>
                <span className="text-xs text-[#A1A1A6]">
                  Deadline: {new Date(job.deadline).toLocaleDateString()}
                </span>
              </div>

              <p className="text-[#C7C7CC] text-sm mb-4 leading-relaxed">
                {job.description}
              </p>

              <div className="mb-4">
                <h4 className="text-white font-semibold text-sm mb-2">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {job.technologies.map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-[#2997FF]/20 text-[#2997FF] text-xs rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4 flex-1">
                <h4 className="text-white font-semibold text-sm mb-2">Requirements:</h4>
                <ul className="text-xs text-[#A1A1A6] space-y-1">
                  {job.requirements.slice(0, 2).map((req, index) => (
                    <li key={index}>• {req}</li>
                  ))}
                </ul>
              </div>

              <a 
                href={`/job-details/${job.id}`}
                className="w-full mt-auto block text-center px-6 py-2 bg-gradient-to-r from-[#2997FF] via-[#A259FF] to-[#FF6F91] text-white rounded-full font-semibold shadow hover:scale-105 transition text-sm"
              >
                Learn More & Apply
              </a>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
}