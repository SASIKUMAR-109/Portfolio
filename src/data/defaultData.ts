import { ProfileData, AboutData, SkillCategory, TimelineItem, Project, ContactInfo, CollaborationData, PortfolioData } from '../types';

export const defaultProfile: ProfileData = {
    name: "Tadela Sasi Kumar",
    nickname: "Sasi",
    roles: ["Full Stack Developer", "Problem Solver", "Tech Enthusiast"],
    quote: "Learn by building, breaking, and debugging",
    profileImage: "/b.png",
    resumeUrl: ""
};

export const defaultAbout: AboutData = {
    bio: "I am a passionate Full Stack Developer and a final year B.Tech IT student. I love solving complex problems, building modern web applications, and experimenting with new technologies. My goal is to build scalable, high-performance web products that deliver great user experiences.",
    image: "/b.png"
};

export const defaultSkills: SkillCategory[] = [
    {
        id: "frontend",
        name: "Frontend Development",
        icon: "Layout",
        skills: [
            { name: "React.js", level: 85 },
            { name: "TypeScript", level: 80 },
            { name: "JavaScript (ES6+)", level: 85 },
            { name: "HTML5 & CSS3", level: 90 },
            { name: "Tailwind CSS", level: 85 }
        ]
    },
    {
        id: "backend",
        name: "Backend Development",
        icon: "Database",
        skills: [
            { name: "Node.js", level: 80 },
            { name: "Express.js", level: 80 },
            { name: "Firebase (Firestore/Auth)", level: 80 },
            { name: "MongoDB / SQL", level: 75 }
        ]
    },
    {
        id: "programming",
        name: "Programming Languages",
        icon: "Code",
        skills: [
            { name: "JavaScript", level: 85 },
            { name: "TypeScript", level: 80 },
            { name: "Python", level: 75 },
            { name: "Java", level: 70 }
        ]
    },
    {
        id: "tools",
        name: "Tools & Workflows",
        icon: "Wrench",
        skills: [
            { name: "Git & GitHub", level: 85 },
            { name: "VS Code", level: 90 },
            { name: "Postman", level: 80 },
            { name: "Vercel / Netlify", level: 80 }
        ]
    }
];

export const defaultTimeline: TimelineItem[] = [
    {
        id: "school",
        date: "2020",
        title: "Secondary School Certificate",
        shortDescription: "Completed 10th grade with excellent GPA.",
        fullDescription: "Completed secondary education with focus on foundational science and mathematics.",
        icon: "School"
    },
    {
        id: "intermediate",
        date: "2022",
        title: "Intermediate Education",
        shortDescription: "Completed 12th grade in MPC stream.",
        fullDescription: "Finished pre-university college course majoring in Mathematics, Physics, and Chemistry.",
        icon: "BookOpen"
    },
    {
        id: "engineering",
        date: "2022-Present",
        title: "B.Tech in Information Technology - SITE",
        shortDescription: "Currently pursuing B.Tech in IT at Sasi Institute of Technology and Engineering.",
        fullDescription: "Pursuing Bachelor of Technology in Information Technology at SITE, specializing in software engineering, database management systems, and web application development.",
        icon: "GraduationCap"
    }
];

export const defaultProjects: Project[] = [
    {
        id: "fullstack-ecom",
        title: "E-Commerce Web Application",
        tagline: "MERN Stack E-Commerce Platform",
        description: "Built a fully functional e-commerce web application featuring user authentication, product catalog, search filters, shopping cart, and checkout system. Integrated payment gateway and admin dashboard for inventory management.",
        icon: "ShoppingCart",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
        githubUrl: "",
        demoUrl: ""
    },
    {
        id: "portfolio-website",
        title: "Personal Portfolio",
        tagline: "Dynamic Developer Portfolio",
        description: "Designed and developed this personal portfolio website to showcase my skills, projects, and experiences. Integrated a custom admin panel using React, Tailwind CSS, and Firebase Firestore for dynamic content management.",
        icon: "User",
        technologies: ["React", "TypeScript", "Firebase", "Framer Motion", "Tailwind CSS"],
        githubUrl: "",
        demoUrl: ""
    },
    {
        id: "task-manager",
        title: "Task Management App",
        tagline: "Productivity & Collaboration Tool",
        description: "Developed a real-time task management application with drag-and-drop boards, task assignment, status tracking, and deadline notifications.",
        icon: "CheckSquare",
        technologies: ["React", "Node.js", "Express", "Firebase", "Tailwind CSS"],
        githubUrl: "",
        demoUrl: ""
    }
];

export const defaultContact: ContactInfo = {
    email: "sasikumar.tadela@gmail.com",
    github: "https://github.com/SASIKUMAR-109",
    linkedin: "https://linkedin.com/in/sasi-kumar-tadela",
    youtube: "",
    twitter: ""
};

export const defaultCollaboration: CollaborationData = {
    title: "Let's Build Together",
    description: "I am actively looking for opportunities to collaborate on full stack web projects and real world applications. Whether it is frontend development, backend APIs, or end to end MERN stack projects, I am eager to learn, contribute and grow through production level work.",
    buttonText: "Get in Touch",
    buttonLink: "#contact",
    icon: "Users",
    visible: true
};

export const defaultPortfolioData: PortfolioData = {
    profile: defaultProfile,
    about: defaultAbout,
    skills: defaultSkills,
    timeline: defaultTimeline,
    projects: defaultProjects,
    contact: defaultContact,
    collaboration: defaultCollaboration,
    customSections: []
};
