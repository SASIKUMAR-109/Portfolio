import { ProfileData, AboutData, SkillCategory, TimelineItem, Project, ContactInfo, CollaborationData, PortfolioData } from '../types';

export const defaultProfile: ProfileData = {
    name: "Srinivasu Kadiyam",
    nickname: "Srinu",
    roles: ["Unity Gameplay Programmer", "Aspiring Entrepreneur", "Problem Solver"],
    quote: "Learn by building, breaking, and debugging",
    profileImage: "https://i.postimg.cc/kgGdy3bD/Srinu.png",
    resumeUrl: ""
};

export const defaultAbout: AboutData = {
    bio: "I can’t stay satisfied with surface-level understanding and always push to know why things work. I learn by experimenting, breaking systems, and fixing them rather than copying solutions. Currently focused on Unity gameplay development, with a long-term goal of building real products and growing into a technical entrepreneur.",
    image: "/b.png"
};

export const defaultSkills: SkillCategory[] = [
    {
        id: "unity-development",
        name: "Unity & Gameplay",
        icon: "Gamepad2",
        skills: [
            { name: "Unity Editor", level: 85 },
            { name: "C# Scripting", level: 80 },
            { name: "Player Controllers", level: 75 },
            { name: "Physics & Rigidbody", level: 70 },
            { name: "Animator & Blend Trees", level: 70 },
            { name: "UI Systems", level: 75 }
        ]
    },
    {
        id: "programming",
        name: "Programming",
        icon: "Code",
        skills: [
            { name: "C#", level: 80 },
            { name: "C", level: 75 },
            { name: "Python", level: 70 },
            { name: "OOP Concepts", level: 75 }
        ]
    },
    {
        id: "tools",
        name: "Tools & Workflow",
        icon: "Wrench",
        skills: [
            { name: "Git & Version Control", level: 80 },
            { name: "VS Code / Visual Studio", level: 85 },
            { name: "Mixamo", level: 70 },
            { name: "Figma", level: 60 }
        ]
    },
    {
        id: "experimental",
        name: "Learning & Experimental",
        icon: "Lightbulb",
        skills: [
            { name: "Unity XR Toolkit", level: 50 },
            { name: "VR Fundamentals", level: 55 },
            { name: "Gameplay Prototyping", level: 70 }
        ]
    }
];

// ORIGINAL TIMELINE - kept all existing items, added Unity training
export const defaultTimeline: TimelineItem[] = [
    {
        id: "school",
        date: "2020",
        title: "10th Grade - Infant Jesus School",
        shortDescription: "Secured 10/10 GPA in SSC (Corona Batch).",
        fullDescription: "Completed 10th grade at Infant Jesus English Medium High School with a perfect 10/10 GPA, adapting to online learning challenges during the pandemic.",
        icon: "School"
    },
    {
        id: "intermediate",
        date: "2022",
        title: "12th Grade - Narayana Junior College",
        shortDescription: "Scored 82% in Intermediate, EPCET Rank - 111072.",
        fullDescription: "Completed Intermediate at Narayana Junior College, focusing on science and engineering subjects, securing 82% and an EPCET Rank of 111072.",
        icon: "BookOpen"
    },
    {
        id: "engineering",
        date: "2023-Present",
        title: "Engineering - SITE",
        shortDescription: "Currently pursuing Engineering at Sasi Institute.",
        fullDescription: "Enrolled in the Engineering program at Sasi Institute of Technology and Engineering, gaining hands-on experience in research and real-world projects.",
        icon: "GraduationCap"
    },
    {
        id: "vr-project",
        date: "2024",
        title: "VR Educational Platform",
        shortDescription: "Developing a VR-based education project.",
        fullDescription: "Taking forward an SIH project as a personal initiative to create a VR-based educational platform, making learning more immersive.",
        icon: "Glasses"
    },
    {
        id: "sih",
        date: "2024",
        title: "Smart India Hackathon",
        shortDescription: "Participated in SIH, cleared two rounds.",
        fullDescription: "Competed in Smart India Hackathon (SIH), successfully clearing two rounds while working on an innovative solution.",
        icon: "Award"
    },
    {
        id: "weather-research",
        date: "2025",
        title: "Weather Satellite Research",
        shortDescription: "Processing image data for satellite research.",
        fullDescription: "Working as a researcher in the R&D department of ECT, focusing on processing satellite image data for weather prediction systems.",
        icon: "Satellite"
    },
    {
        id: "youtube",
        date: "2025",
        title: "YouTube - Srinu Bytes",
        shortDescription: "Started Srinu Bytes for tech & VR content.",
        fullDescription: "Launched Srinu Bytes YouTube channel to share insights on VR development, tech innovations, and startup experiences.",
        icon: "Youtube"
    },
    {
        id: "unity-training",
        date: "2025",
        title: "Unity Development Training",
        shortDescription: "Training under professional Unity developer mentor.",
        fullDescription: "Currently undergoing professional training in Unity game development, learning production-level practices and building real gameplay systems.",
        icon: "Gamepad2"
    }
];

// ORIGINAL PROJECTS - kept Weather Prediction, added Unity projects
export const defaultProjects: Project[] = [
    {
        id: "gameplay-systems",
        title: "Multi-Level Unity Game",
        tagline: "Core Gameplay Systems & Progression",
        description: "Built a complete multi-level Unity game focused on gameplay mechanics, progression, and UI interaction. Implemented player movement, gravity-based jumping, collision handling, and score tracking entirely using C#. Designed three playable levels with increasing difficulty and objective-based progression. Developed full in-game UI systems including menus, settings, score display, game over, and completion screens.",
        icon: "Gamepad2",
        technologies: ["Unity", "C#", "Animator", "UI Toolkit"],
        githubUrl: "",
        demoUrl: ""
    },
    {
        id: "player-controller",
        title: "Advanced Player Controller",
        tagline: "Reusable Movement Systems",
        description: "Built reusable player controller systems using both Rigidbody-based and CharacterController-based approaches. Implemented movement, jumping, sliding, and camera-follow behavior. Integrated character animations using Animator Controller and Blend Trees. Connected gameplay states with animation transitions and sound effects.",
        icon: "User",
        technologies: ["Unity", "C#", "CharacterController", "Rigidbody", "Mixamo"],
        githubUrl: "",
        demoUrl: ""
    },
    {
        id: "physics-games",
        title: "Physics-Based Mini Games",
        tagline: "Obstacle Courses & Bowling",
        description: "Developed obstacle course games with collision-based win and fail conditions. Built a bowling game using Rigidbody physics and realistic interactions. Created track-based ball games with moving platforms, ramps, and button-triggered mechanics. All projects focused on understanding Unity physics system deeply.",
        icon: "Target",
        technologies: ["Unity", "C#", "Physics", "Rigidbody", "Colliders"],
        githubUrl: "",
        demoUrl: ""
    },
    {
        id: "vr-education",
        title: "VR Educational Project",
        tagline: "Immersive Learning Experience",
        description: "I have consistently worked on VR-based educational projects, focusing on making learning immersive and interactive. My goal has been to leverage VR technology to simplify complex concepts, especially in STEM education. From developing 3D models and simulations to integrating backend communication for VR labs, I have explored various ways to make education more engaging and accessible.",
        icon: "Globe",
        technologies: ["Unity", "XR Toolkit", "Vuforia", "C#"],
        githubUrl: "",
        demoUrl: ""
    },
    {
        id: "weather-prediction",
        title: "Weather Prediction System",
        tagline: "AI-Powered Forecasting",
        description: "I worked on a Weather Prediction System that used satellite images, radar data, and AI analysis to provide accurate, real-time weather forecasts. The system was designed to predict rainfall with precise timing, benefiting agriculture and institutional weather reporting. I used Python, OpenWeather API, and data from MOSDAC and MAUSAM IMD to process satellite imagery and radar inputs.",
        icon: "Cloud",
        technologies: ["Python", "OpenWeather API", "MOSDAC", "MAUSAM IMD"],
        githubUrl: "",
        demoUrl: ""
    },
    {
        id: "xr-experiments",
        title: "XR & VR Experiments",
        tagline: "Learning VR Fundamentals",
        description: "Set up and tested basic VR scenes using Unity XR Device Simulator. Experimented with VR interactions and controller input handling. Actively troubleshooting XR controller input issues to strengthen XR fundamentals and learn immersive development.",
        icon: "Glasses",
        technologies: ["Unity", "XR Toolkit", "VR", "C#"],
        githubUrl: "",
        demoUrl: ""
    }
];

export const defaultContact: ContactInfo = {
    email: "srinu18yt@gmail.com",
    github: "https://github.com/CodeSrinu",
    linkedin: "",
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
