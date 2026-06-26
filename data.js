// data.js — single source of truth for all portfolio content.
// Pulled directly from Prisha's resume. Edit here, not in HTML.
export const profile = {
    name: "Prisha Raj",
    role: "B.Tech, AI & Machine Learning",
    institution: "Birla Institute of Technology, Mesra",
    cgpa: "9.33",
    email: "rajprisha1505@gmail.com",
    phone: "+91 7979852001",
    github: "https://github.com/lowkeyprisha",
    linkedin: "https://linkedin.com/in/prisha-raj-a41092366",
    location: "Patna, India",
};
export const skillGroups = [
    { label: "Languages", items: ["Python", "Java", "C", "JavaScript", "TypeScript", "SQL"] },
    { label: "Web & Backend", items: ["React", "Next.js", "Vite", "Node.js", "Express.js", "Socket.io", "REST APIs", "Tailwind CSS"] },
    { label: "Data & Infra", items: ["MongoDB", "PostgreSQL", "Git/GitHub", "Render", "Vercel", "MongoDB Atlas", "Postman"] },
    { label: "CS Fundamentals", items: ["Data Structures", "Algorithms", "Operating Systems", "OOP", "Competitive Programming"] },
    { label: "ML / Other", items: ["Pandas", "NumPy", "scikit-learn", "TensorFlow", "PyTorch", "Jupyter"] },
];
export const projects = [
    {
        id: "syncsketch",
        name: "SyncSketch",
        tagline: "Real-time collaborative whiteboard",
        period: "2026",
        stack: ["React", "TypeScript", "Vite", "Socket.io"],
        bullets: [
            "Multi-room collaborative drawing app with real-time canvas sync across concurrent users over WebSocket connections.",
            "Event-driven architecture broadcasting draw, undo, and clear actions with sub-second latency — tested at 4 simultaneous users per room without state desync.",
            "Room-based session system isolating whiteboard instances for independent concurrent collaboration.",
        ],
        metrics: [
            { label: "latency", value: "<1s" },
            { label: "concurrent users/room", value: "4" },
        ],
        repoUrl: "https://github.com/lowkeyprisha/basic-sketchboard",
        status: "shipped",
        lang: "TypeScript",
        langColor: "#3178c6",
        icon: "🎨",
        accent: "#FF6B6B",
    },
    {
        id: "pension-ms",
        name: "Pension Management System",
        tagline: "Full-stack pensioner records platform",
        period: "2026",
        stack: ["React", "Vite", "Tailwind", "Node.js", "Express", "MongoDB"],
        bullets: [
            "Full CRUD workflows for pensioner registration, record updates, and queries with schema-level validation on every route.",
            "Structured error handling rejects malformed or duplicate records before they hit the database.",
            "MongoDB indexes on pensioner ID and Aadhaar number for fast lookup at scale.",
            "Deployed: frontend on Vercel, backend on Render, database on MongoDB Atlas — full production pipeline.",
        ],
        metrics: [
            { label: "stack", value: "MERN" },
            { label: "deploy", value: "3 services" },
        ],
        repoUrl: "https://github.com/lowkeyprisha/pension-management",
        status: "deployed",
        lang: "JavaScript",
        langColor: "#f1e05a",
        icon: "🏦",
        accent: "#4ECDC4",
    },
    {
        id: "gridlock",
        name: "Flipkart Gridlock 2.0",
        tagline: "Urban traffic demand prediction",
        period: "2026",
        stack: ["Python", "Pandas", "NumPy", "scikit-learn"],
        bullets: [
            "End-to-end ML pipeline predicting urban traffic demand for Flipkart's Gridlock Hackathon 2.0.",
            "Feature engineering and iteration across regression and ensemble models, optimized for a max(0, 100×R²) leaderboard metric.",
            "Delivered a documented notebook, README, and write-up as the final submission package.",
        ],
        metrics: [
            { label: "target score", value: "90+" },
            { label: "metric", value: "100×R²" },
        ],
        repoUrl: "https://github.com/lowkeyprisha/traffic-prediction",
        status: "competition",
        lang: "Jupyter Notebook",
        langColor: "#DA5B0B",
        icon: "🚦",
        accent: "#FFE66D",
    },
];
export const oss = {
    org: "GirlScript Summer of Code (GSSoC '26)",
    project: "eventone — MERN event management platform",
    description: "Open-source contributor",
    bullets: [
        "Resolved a GitHub issue implementing rate limiting on authentication endpoints, modifying rateLimiters.js and authRoutes.js to prevent brute-force abuse on login/signup routes.",
        "Authored a clear, review-ready PR description and resolved maintainer feedback to get the change merged into main.",
    ],
    year: "2026",
};
export const dsaStats = {
    solved: "350+",
    plan: "90-day, 20-pattern study plan",
    repoUrl: "https://github.com/lowkeyprisha/Leetcode",
    extra: "Hacktoberfest '25 Contributor",
};
export const achievements = [
    "Qualifier, Google Big Code — advanced past the initial screening round.",
];
export const activities = [
    "IGNITE Club — Content, Event Management & Design teams (technical write-ups, event ops, Canva creatives).",
    "National Service Scheme (NSS) — community service and social awareness initiatives.",
];
export const bootLines = [
    "$ whoami",
    "prisha-raj — AI & ML, BIT Mesra · CGPA 9.33",
    "$ cat stack.txt",
    "TypeScript · React · Node · Python · MongoDB",
    "$ git log --oneline -4",
    "a4f21c9  ship SyncSketch — real-time canvas sync",
    "9b13e02  deploy pension-ms — vercel + render + atlas",
    "c88d410  submit gridlock-2.0 — leaderboard target 90+",
    "1e9aa31  merge #306 — rate limiting on auth routes",
];