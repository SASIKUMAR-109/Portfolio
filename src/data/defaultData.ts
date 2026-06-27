import { ProfileData, AboutData, SkillCategory, TimelineItem, Project, ContactInfo, CollaborationData, PortfolioData } from '../types';

export const defaultProfile: ProfileData = {
    name: "Tadela Sasi Kumar",
    nickname: "Sasi",
    roles: ["Full Stack Developer", "Problem Solver", "Tech Enthusiast"],
    quote: "Learn by building, breaking, and debugging",
    profileImage: "https://cdn.phototourl.com/free/2026-06-26-f46ac545-6c17-4e4b-bebf-7e1a3a0de040.png",
    resumeUrl: "https://drive.google.com/file/d/1IkR1cpm12JMJnZCNg8nfPjPC2l9buTht/view?usp=drive_link"
};

export const defaultAbout: AboutData = {
    bio: "I am not the kind of person who stops at getting the code to work — I want to understand why it works. I learn by building real things, breaking them, and figuring out what went wrong, which is how I have gone from basic HTML pages to full stack applications with Python backends and live deployments. Currently advancing into the MERN stack with a long term goal of becoming a developer who ships products that actually matter.",
    image: "https://cdn.phototourl.com/free/2026-06-26-1c7fe007-130c-40ac-9995-883742542a92.png"
};

export const defaultSkills: SkillCategory[] = [
    {
        id: "frontend",
        name: "Frontend Development",
        icon: "Layout",
        skills: [
            { name: "HTML & CSS", level: 90 },
            { name: "JavaScript", level: 85 },
            { name: "Bootstrap", level: 85 },
            { name: "Responsive Design", level: 85 },
            { name: "CSS Media Queries", level: 80 }
        ]
    },
    {
        id: "backend",
        name: "Backend & Database",
        icon: "Database",
        skills: [
            { name: "Python", level: 80 },
            { name: "Flask", level: 80 },
            { name: "REST APIs", level: 75 },
            { name: "SQLite", level: 75 },
            { name: "SQL", level: 75 }
        ]
    },
    {
        id: "tools",
        name: "Tools & Workflow",
        icon: "Wrench",
        skills: [
            { name: "Git & GitHub", level: 80 },
            { name: "Command Line", level: 75 },
            { name: "VS Code", level: 85 },
            { name: "Chart.js", level: 75 }
        ]
    },
    {
        id: "experimental",
        name: "Learning & Experimental",
        icon: "Lightbulb",
        skills: [
            { name: "React (learning)", level: 60 },
            { name: "Node.js (learning)", level: 50 },
            { name: "Express (learning)", level: 50 },
            { name: "Computer Networks", level: 70 },
            { name: "Operating Systems", level: 70 }
        ]
    }
];

export const defaultTimeline: TimelineItem[] = [
    {
        id: "school",
        date: "2021",
        title: "Secondary School Certificate",
        shortDescription: "Completed SSC at Infant Jesus English Medium High School with GPA 9.8",
        fullDescription: "Completed 10th grade at Infant Jesus English Medium High School with an outstanding GPA of 9.8, building a strong academic foundation.",
        icon: "School"
    },
    {
        id: "intermediate",
        date: "2023",
        title: "Intermediate Education",
        shortDescription: "Completed Intermediate at Chanikya Junior College with 88%",
        fullDescription: "Completed Intermediate / 12th grade at Chanikya Junior College with 88%, specialising in science and mathematics.",
        icon: "BookOpen"
    },
    {
        id: "engineering",
        date: "2023-Present",
        title: "B.Tech in Information Technology — Sir CR Reddy Autonomous College",
        shortDescription: "Currently pursuing B.Tech IT at Sir CR Reddy Autonomous College, Eluru with CGPA 8.04",
        fullDescription: "Pursuing Bachelor of Technology in Information Technology at Sir CR Reddy Autonomous College, Eluru, Andhra Pradesh. Currently in final year with a CGPA of 8.04, focusing on full stack web development, computer networks and database systems.",
        icon: "GraduationCap"
    }
];

export const defaultProjects: Project[] = [
    {
        id: "placement-tracker",
        title: "College Placement Tracker",
        tagline: "Full stack dashboard visualising college placement data across India",
        description: "A full stack web application that tracks and visualises placement data of 221 colleges across India from 2017 to 2025, sourced from NIRF Ministry of Education government rankings. Built a Python CSV data pipeline feeding a SQLite database served via Flask REST API with an interactive frontend featuring college search, year-wise trend charts and stat cards.",
        icon: "TrendingUp",
        technologies: ["Python", "Flask", "SQLite", "Chart.js", "HTML", "CSS", "JavaScript"],
        githubUrl: "https://github.com/SASIKUMAR-109/",
        demoUrl: "https://placement-tracker-in.vercel.app/",
        playUrl: ""
    },
    {
        id: "wikipedia-search",
        title: "Wikipedia Search Application",
        tagline: "Search and explore Wikipedia articles instantly",
        description: "A responsive search application that uses asynchronous fetch GET API calls to retrieve and display Wikipedia results in real time. Results are rendered as styled HTML list elements with the option to open any article in a new tab. Fully optimised for desktop, tablet and mobile screens using Bootstrap.",
        icon: "Search",
        technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
        githubUrl: "",
        demoUrl: "https://wikipediascan1.ccbp.tech/",
        playUrl: ""
    },
    {
        id: "todos-app",
        title: "Todos Application",
        tagline: "A clean and simple task manager with full CRUD operations",
        description: "A robust task tracking application with full CRUD capabilities. Features dynamic UI updates via JavaScript event listeners and DOM manipulation for seamless add, edit and delete operations. Tasks are persisted using Local Storage ensuring they are retained across all browser sessions without any backend dependency.",
        icon: "CheckSquare",
        technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
        githubUrl: "",
        demoUrl: "https://todosapp109.ccbp.tech/",
        playUrl: ""
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
