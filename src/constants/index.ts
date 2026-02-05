export const navLinks = [
  { id: "home", title: "Home" },
  { id: "about", title: "About" },
  { id: "skills", title: "Skills" },
  { id: "experience", title: "Experience" },
  { id: "projects", title: "Projects" },
  { id: "contact", title: "Contact" },
];

export const personalInfo = {
  name: "Chandan Kumar",
  title: "Senior Full Stack Developer",
  email: "zoomchandan28@gmail.com",
  phone: "+91 7903229504",
  github: "https://github.com/cmschandan",
  linkedin: "https://linkedin.com/in/hrefcoder",
  location: "Amsterdam, Netherlands",
  resumeUrl: "/ChandanKumar.pdf",
};

export const aboutData = {
  summary: "Full Stack Developer with 7 years of experience building scalable web applications using Angular, Node.js, and AWS. Expert in Serverless architectures, clean code, and delivering end-to-end solutions in agile teams.",
  stats: [
    { value: "7+", label: "Years Experience" },
    { value: "50+", label: "Projects Completed" },
    { value: "AWS", label: "Certified Developer" },
  ],
  locations: [
    { name: "Amsterdam", country: "Netherlands", current: true, lat: 52.3676, lng: 4.9041 },
    { name: "Bokaro", country: "India", current: false, lat: 23.6693, lng: 86.1511 },
    { name: "Bangalore", country: "India", current: false, lat: 12.9716, lng: 77.5946 },
  ],
};

export const skills = {
  frontend: [
    { name: "Angular", icon: "angular", level: 95 },
    { name: "React.js", icon: "react", level: 90 },
    { name: "Next.js", icon: "nextjs", level: 85 },
    { name: "TypeScript", icon: "typescript", level: 92 },
    { name: "Tailwind CSS", icon: "tailwind", level: 88 },
    { name: "HTML5/CSS3", icon: "html", level: 95 },
  ],
  backend: [
    { name: "Node.js", icon: "nodejs", level: 92 },
    { name: "Express.js", icon: "express", level: 90 },
    { name: "Python", icon: "python", level: 75 },
    { name: "Serverless", icon: "serverless", level: 88 },
    { name: "Docker", icon: "docker", level: 80 },
    { name: "GraphQL", icon: "graphql", level: 78 },
  ],
  database: [
    { name: "MongoDB", icon: "mongodb", level: 88 },
    { name: "PostgreSQL", icon: "postgresql", level: 85 },
    { name: "MySQL", icon: "mysql", level: 85 },
    { name: "DynamoDB", icon: "dynamodb", level: 82 },
  ],
  cloud: [
    { name: "AWS Lambda", icon: "aws", level: 90 },
    { name: "EC2", icon: "aws", level: 85 },
    { name: "CloudFormation", icon: "aws", level: 82 },
    { name: "API Gateway", icon: "aws", level: 88 },
    { name: "CI/CD", icon: "cicd", level: 85 },
  ],
  tools: [
    { name: "Git", icon: "git", level: 95 },
    { name: "Jira", icon: "jira", level: 90 },
    { name: "Agile/Scrum", icon: "agile", level: 92 },
  ],
};

export const experiences = [
  {
    id: 1,
    company: "Cyber Waves B.V",
    location: "Amsterdam, Netherlands",
    position: "Full Stack Developer",
    duration: "October 2022 - Present",
    description: [
      "Implementing modern front-end technologies with Angular and React.js",
      "Implementing State management which reduces overall application load and reduces API calls",
      "Working with REST APIs and backend services using Node.js and serverless",
      "Optimized API integration, optimize query resulting boosting system performance",
    ],
    technologies: ["Angular", "React.js", "Node.js", "Serverless", "AWS"],
  },
  {
    id: 2,
    company: "Keeplee Infotech Pvt. Ltd.",
    location: "Bokaro, India",
    position: "Web Developer",
    duration: "Feb 2022 – Sep 2023",
    description: [
      "Designed and built dynamic CMS and eCommerce websites",
      "Enhanced UI/UX components and optimized site performance",
    ],
    technologies: ["JavaScript", "React", "Node.js", "MongoDB"],
  },
  {
    id: 3,
    company: "Cotocus PVT LTD.",
    location: "Bangalore, India",
    position: "Team Lead",
    duration: "July 2018 – June 2019",
    description: [
      "Developed and managed various software solutions including digital marketing and shipping applications",
      "Oversaw frontend and backend teams, mentoring junior developers and ensuring code quality",
    ],
    technologies: ["JavaScript", "Python", "MySQL", "AWS"],
  },
];

export const projects = [
  {
    id: 1,
    title: "Cyber Waves Platform",
    description: "Enterprise maritime logistics platform built with Angular. Developed key components including Inspect, Vessel, EMRV modules and other critical features. Implemented state management, REST API integrations, and optimized performance for complex data visualizations.",
    image: "/images/project1.jpg",
    technologies: ["Angular", "TypeScript", "RxJS", "Node.js", "AWS"],
    liveUrl: "https://uat.cyberwaves.eu/",
    githubUrl: "#",
    category: "Enterprise",
  },
  {
    id: 2,
    title: "WizBrand",
    description: "A comprehensive digital marketing platform with SEO tools, social media management, and analytics dashboard. Built with modern technologies for scalability and performance.",
    image: "/images/project2.jpg",
    technologies: ["React", "Node.js", "MongoDB", "AWS"],
    liveUrl: "https://www.wizbrand.com/",
    githubUrl: "#",
    category: "Digital Marketing",
  },
  {
    id: 3,
    title: "SEODaily",
    description: "SEO analysis and reporting application that helps businesses track their search engine rankings, analyze competitors, and optimize their online presence.",
    image: "/images/project3.jpg",
    technologies: ["Angular", "Express.js", "PostgreSQL", "Docker"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Digital Marketing",
  },
  {
    id: 4,
    title: "E-Commerce Platform",
    description: "Full-featured e-commerce solution with inventory management, payment integration, and real-time order tracking capabilities.",
    image: "/images/project4.jpg",
    technologies: ["Next.js", "Serverless", "DynamoDB", "Stripe"],
    liveUrl: "#",
    githubUrl: "#",
    category: "E-Commerce",
  },
];

export const certifications = [
  {
    name: "AWS Certified Developer Associate",
    issuer: "Stephane Maarek - Udemy",
    status: "In Progress",
    courseUrl: "https://www.udemy.com/course/aws-certified-developer-associate-dva-c01/",
    icon: "aws",
  },
];
