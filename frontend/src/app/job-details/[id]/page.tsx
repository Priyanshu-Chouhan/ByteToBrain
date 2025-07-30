"use client";

import { useParams } from 'next/navigation';
import { useState } from 'react';

const jobDetails = {
  1: {
    title: "MERN Stack Developer",
    type: "Full-time",
    location: "Remote",
    salary: "₹4-8 LPA",
    experience: "2-4 years",
    image: "/mern.webp",
    overview: "We are seeking a skilled MERN Stack Developer to join our dynamic team. You will be responsible for developing and maintaining web applications using MongoDB, Express.js, React.js, and Node.js.",
    responsibilities: [
      "Develop and maintain web applications using MERN stack",
      "Write clean, maintainable, and efficient code",
      "Collaborate with cross-functional teams to define and implement features",
      "Optimize applications for maximum speed and scalability",
      "Implement responsive design and ensure cross-browser compatibility",
      "Participate in code reviews and maintain coding standards"
    ],
    requirements: [
      "2+ years of experience with MERN stack development",
      "Strong proficiency in JavaScript and TypeScript",
      "Experience with React.js and its ecosystem (Redux, Context API)",
      "Knowledge of Node.js and Express.js framework",
      "Experience with MongoDB and database design",
      "Understanding of RESTful APIs and GraphQL"
    ],
    benefits: [
      "Competitive salary package",
      "Health insurance coverage",
      "Flexible working hours",
      "Remote work opportunities",
      "Professional development budget",
      "Annual performance bonuses"
    ]
  },
  2: {
    title: "React.js Developer",
    type: "Full-time",
    location: "Hybrid",
    salary: "₹3-6 LPA",
    experience: "2-3 years",
    image: "/react.png",
    overview: "Join our frontend team to create beautiful and responsive user interfaces using React.js. You will work on cutting-edge projects and collaborate with designers and backend developers.",
    responsibilities: [
      "Build reusable components and front-end libraries",
      "Translate designs and wireframes into high-quality code",
      "Optimize components for maximum performance across devices",
      "Collaborate with design team to implement UI/UX designs",
      "Maintain and improve existing React applications",
      "Write unit tests and ensure code quality"
    ],
    requirements: [
      "3+ years of experience with React.js development",
      "Strong knowledge of JavaScript ES6+ and TypeScript",
      "Experience with Next.js framework",
      "Proficiency in HTML5, CSS3, and responsive design",
      "Knowledge of state management (Redux, Context API)",
      "Experience with testing frameworks (Jest, React Testing Library)"
    ],
    benefits: [
      "Competitive salary with performance incentives",
      "Health and dental insurance",
      "Hybrid work model",
      "Learning and development opportunities",
      "Modern office environment",
      "Flexible PTO policy"
    ]
  },
  3: {
    title: "Node.js Backend Developer",
    type: "Full-time",
    location: "Remote",
    salary: "₹4-7 LPA",
    experience: "2-4 years",
    image: "/nodejs.png",
    overview: "Build robust backend systems and APIs to power our web and mobile applications. You will work with modern technologies and scalable architectures.",
    responsibilities: [
      "Develop and maintain Node.js backend applications",
      "Design and implement RESTful APIs and GraphQL endpoints",
      "Work with databases (MongoDB, PostgreSQL) and optimize queries",
      "Implement authentication and authorization systems",
      "Integrate third-party services and APIs",
      "Monitor application performance and troubleshoot issues"
    ],
    requirements: [
      "2+ years of experience with Node.js development",
      "Experience with databases (MongoDB/PostgreSQL)",
      "Knowledge of cloud services (AWS/Azure)",
      "Understanding of microservices architecture",
      "Experience with API design and development",
      "Knowledge of testing frameworks and practices"
    ],
    benefits: [
      "Competitive salary package",
      "Health insurance coverage",
      "100% remote work",
      "Professional development budget",
      "Flexible working hours",
      "Annual performance bonuses"
    ]
  },
  4: {
    title: "UI/UX Designer",
    type: "Full-time",
    location: "Hybrid",
    salary: "₹3-5 LPA",
    experience: "2-3 years",
    image: "/paint-palette.png",
    overview: "Create stunning user experiences and interfaces for web and mobile applications. You will work closely with developers and stakeholders to bring designs to life.",
    responsibilities: [
      "Design user interfaces for web and mobile applications",
      "Create wireframes, prototypes, and user journey maps",
      "Conduct user research and usability testing",
      "Collaborate with developers to ensure design implementation",
      "Maintain design systems and style guides",
      "Present design concepts to clients and stakeholders"
    ],
    requirements: [
      "2+ years of experience in UI/UX design",
      "Proficiency in Figma and Adobe Creative Suite",
      "Strong portfolio showcasing design work",
      "Understanding of user-centered design principles",
      "Knowledge of responsive design and mobile-first approach",
      "Experience with prototyping tools and design systems"
    ],
    benefits: [
      "Creative and collaborative work environment",
      "Health insurance and wellness programs",
      "Hybrid work flexibility",
      "Design tools and software licenses",
      "Conference and workshop attendance",
      "Career growth opportunities"
    ]
  },
  5: {
    title: "Digital Marketing Specialist",
    type: "Full-time",
    location: "Remote",
    salary: "₹2.5-5 LPA",
    experience: "2-3 years",
    image: "/social-media.png",
    overview: "Drive growth through digital marketing strategies and campaigns across multiple channels. You will work with data-driven approaches to maximize ROI.",
    responsibilities: [
      "Plan and execute digital marketing campaigns",
      "Manage social media accounts and content strategy",
      "Optimize websites for search engines (SEO)",
      "Run and optimize paid advertising campaigns (Google Ads, Facebook Ads)",
      "Analyze campaign performance and generate reports",
      "Collaborate with content creators and designers"
    ],
    requirements: [
      "2+ years of experience in digital marketing",
      "Experience with Google Ads and social media advertising",
      "Knowledge of SEO and content marketing",
      "Analytics and data-driven approach",
      "Experience with marketing automation tools",
      "Strong communication and creative skills"
    ],
    benefits: [
      "Performance-based incentives",
      "Health insurance coverage",
      "Remote work opportunity",
      "Marketing tools and platform access",
      "Professional certification support",
      "Flexible working hours"
    ]
  },
  6: {
    title: "Mobile App Developer",
    type: "Full-time",
    location: "Hybrid",
    salary: "₹4-8 LPA",
    experience: "2-4 years",
    image: "/app-development.png",
    overview: "Develop cross-platform mobile applications for iOS and Android platforms. You will work with modern frameworks and create engaging mobile experiences.",
    responsibilities: [
      "Develop mobile applications using React Native or Flutter",
      "Implement responsive and intuitive user interfaces",
      "Integrate mobile apps with backend APIs and services",
      "Optimize app performance and ensure smooth user experience",
      "Handle app store submissions and updates",
      "Debug and troubleshoot mobile-specific issues"
    ],
    requirements: [
      "2+ years of experience in mobile app development",
      "Experience with React Native or Flutter",
      "Knowledge of mobile app deployment processes",
      "Understanding of mobile UI/UX principles",
      "Experience with mobile testing and debugging",
      "Knowledge of app store guidelines and requirements"
    ],
    benefits: [
      "Competitive salary with project bonuses",
      "Health and wellness benefits",
      "Hybrid work model",
      "Latest mobile devices for testing",
      "Professional development opportunities",
      "Team collaboration and learning environment"
    ]
  },
  8: {
    title: "Business Development Executive",
    type: "Full-time",
    location: "On-site",
    salary: "₹3-6 LPA",
    experience: "2-3 years",
    image: "/customer (2).png",
    overview: "Drive business growth by identifying new opportunities and building strong client relationships. You will be responsible for expanding our client base and revenue.",
    responsibilities: [
      "Identify and pursue new business opportunities",
      "Build and maintain relationships with potential clients",
      "Prepare and deliver sales presentations and proposals",
      "Negotiate contracts and close deals",
      "Collaborate with technical teams for project scoping",
      "Maintain CRM records and sales pipeline"
    ],
    requirements: [
      "2+ years of experience in business development or sales",
      "Strong communication and negotiation skills",
      "Experience with CRM tools and sales processes",
      "Proven track record in lead generation and conversion",
      "Understanding of technology services and solutions",
      "Bachelor's degree in Business or related field"
    ],
    benefits: [
      "Base salary plus commission structure",
      "Health insurance and benefits",
      "Performance-based incentives",
      "Professional development and training",
      "Career advancement opportunities",
      "Team events and recognition programs"
    ]
  },
  7: {
    title: "Java Developer",
    type: "Full-time",
    location: "Hybrid", 
    salary: "₹5-10 LPA",
    experience: "3-5 years",
    image: "/java.png",
    overview: "We are looking for an experienced Java Developer to join our backend team. You will be responsible for developing enterprise-level applications using Java and Spring framework.",
    responsibilities: [
      "Design and develop Java-based applications using Spring Boot",
      "Write well-designed, testable, and efficient code",
      "Develop and maintain RESTful web services and APIs",
      "Work with databases and implement data access layers",
      "Collaborate with frontend developers for API integration",
      "Participate in system architecture and design decisions"
    ],
    requirements: [
      "3+ years of experience in Java development",
      "Strong knowledge of Spring Boot and Spring Framework",
      "Experience with relational databases (MySQL, PostgreSQL)",
      "Understanding of microservices architecture",
      "Knowledge of RESTful web services and API design",
      "Experience with Maven or Gradle build tools"
    ],
    benefits: [
      "Attractive salary package",
      "Comprehensive health benefits",
      "Work from home flexibility",
      "Professional certification support",
      "Career advancement opportunities",
      "Annual bonus based on performance"
    ]
  },
  9: {
    title: "DevOps Engineer", 
    type: "Full-time",
    location: "Remote",
    salary: "₹6-12 LPA", 
    experience: "2-4 years",
    image: "/devops.png",
    overview: "Join our DevOps team to manage cloud infrastructure and automate deployment processes. You will work with cutting-edge technologies to ensure scalable and reliable applications.",
    responsibilities: [
      "Design and implement CI/CD pipelines using Jenkins/GitHub Actions",
      "Manage cloud infrastructure on AWS/Azure platforms",
      "Containerize applications using Docker and Kubernetes",
      "Monitor system performance and implement logging solutions",
      "Automate infrastructure provisioning using Terraform",
      "Implement security best practices and compliance"
    ],
    requirements: [
      "2+ years of experience with cloud platforms (AWS/Azure)",
      "Strong knowledge of containerization (Docker, Kubernetes)",
      "Experience with CI/CD tools (Jenkins, GitLab CI, GitHub Actions)",
      "Proficiency in Infrastructure as Code (Terraform, CloudFormation)",
      "Knowledge of monitoring tools (Prometheus, Grafana, ELK Stack)",
      "Experience with Linux system administration"
    ],
    benefits: [
      "Competitive salary with cloud certifications bonus",
      "Comprehensive health and wellness benefits",
      "100% remote work opportunity",
      "Latest tools and technology access",
      "Conference and training budget",
      "Flexible working hours across time zones"
    ]
  }
};

export default function JobDetails() {
  const params = useParams();
  const jobId = parseInt(params.id as string);
  const job = jobDetails[jobId as keyof typeof jobDetails];
  const [showPopup, setShowPopup] = useState(false);

  const handleApplyClick = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#18181b] via-[#232326] to-[#1e293b] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Job Not Found</h1>
          <a href="/career" className="text-[#2997FF] hover:underline">← Back to Careers</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#18181b] via-[#232326] to-[#1e293b] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <a href="/career" className="text-[#2997FF] hover:underline mb-4 inline-block">← Back to Careers</a>
          
          <div className="bg-[#232326]/80 rounded-2xl p-8 border border-[#2997FF]/20">
            <div className="flex items-center gap-6 mb-6">
              <img src={job.image} alt={job.title} className="w-16 h-16 rounded-lg" />
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
                <div className="flex gap-4 text-[#C7C7CC]">
                  <span>{job.type}</span>
                  <span>•</span>
                  <span>{job.location}</span>
                  <span>•</span>
                  <span>{job.salary}</span>
                  <span>•</span>
                  <span>{job.experience}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Job Overview</h2>
                  <p className="text-[#C7C7CC] leading-relaxed">{job.overview}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Key Responsibilities</h2>
                  <ul className="space-y-2">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index} className="text-[#C7C7CC] flex items-start gap-3">
                        <span className="text-[#2997FF] mt-1">•</span>
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Requirements</h2>
                  <ul className="space-y-2">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="text-[#C7C7CC] flex items-start gap-3">
                        <span className="text-[#2997FF] mt-1">•</span>
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Benefits & Perks</h2>
                  <ul className="space-y-2">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="text-[#C7C7CC] flex items-start gap-3">
                        <span className="text-[#2997FF] mt-1">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className="space-y-6">
                <div className="bg-[#18181b]/50 rounded-xl p-6 border border-[#2997FF]/20">
                  <h3 className="text-xl font-semibold text-white mb-4">Apply Now</h3>
                  <p className="text-[#C7C7CC] text-sm mb-4">Ready to join our team? Send us your resume and let's talk!</p>
                  <button 
                    onClick={handleApplyClick}
                    className="w-full px-6 py-3 bg-gradient-to-r from-[#2997FF] via-[#A259FF] to-[#FF6F91] text-white rounded-full font-semibold hover:scale-105 transition"
                  >
                    Apply Now
                  </button>
                </div>

                <div className="bg-[#18181b]/50 rounded-xl p-6 border border-[#2997FF]/20">
                  <h3 className="text-lg font-semibold text-white mb-3">Quick Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#A1A1A6]">Job Type:</span>
                      <span className="text-white">{job.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A1A1A6]">Location:</span>
                      <span className="text-white">{job.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A1A1A6]">Experience:</span>
                      <span className="text-white">{job.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A1A1A6]">Salary:</span>
                      <span className="text-white">{job.salary}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#232326] rounded-2xl p-8 border border-[#2997FF]/20 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Coming Soon!</h3>
            <p className="text-[#C7C7CC]">Application process will be available soon.</p>
          </div>
        </div>
      )}
    </div>
  );
}