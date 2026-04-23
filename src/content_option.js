const logotext = "Richard";
const meta = {
    title: "Richard Huang",
    description: "",
};

const introdata = {
    title: "Richard Huang",
    animated: {
        first: "Computer Science Student",
        second: "Software Engineer",
        third: "AI Builder",
    },
    description: "",
    your_img_url: "",
};

const dataabout = {
    title: "A little about me",
    aboutme: "I'm a Computer Science student at the University of Michigan focused on building scalable backend systems, AI-powered tools, and full-stack products. I enjoy working across cloud infrastructure, machine learning, and product engineering to turn complex ideas into practical software."
};
const worktimeline = [{
        jobtitle: "Software Development Engineer Intern",
        where: "Amazon Web Services (AWS)",
        date: "5.2025 - 8.2025",
    },
    {
        jobtitle: "Software Engineer / Student Researcher",
        where: "SIM Driving Simulator Lab",
        date: "1.2025 - 1.2026",
    },
    {
        jobtitle: "AI Software Engineer Intern",
        where: "Avodah",
        date: "9.2024 - 12.2024",
    },
];

const education = [{
        degree: "B.S. in Computer Science",
        where: "University of Michigan",
        date: "9.2023 - 5.2027",
    },
    {
        degree: "Coursework",
        where: "Web Systems, Computer Theory, Algorithms, Data Structures, Computer Architecture",
        date: "GPA 3.7",
    },
];

const skills = [{
        name: "Python",
        value: 90,
    },
    {
        name: "C++",
        value: 85,
    },
    {
        name: "JavaScript / TypeScript",
        value: 85,
    },
    {
        name: "AWS (Lambda, Glue, Athena, Step Functions)",
        value: 90,
    },
    {
        name: "React + Flask",
        value: 80,
    },
];

const services = [{
        title: "UI & UX Design",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at nisl euismod urna bibendum sollicitudin.",
    },
    {
        title: "Mobile Apps",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at nisl euismod urna bibendum sollicitudin.",
    },
    {
        title: "Wordpress Design",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at nisl euismod urna bibendum sollicitudin.",
    },
];

const dataportfolio = [{
        img: "https://i.postimg.cc/wxsbdqVh/Got-Food-Long.png",
        description: "GotFood: A health conscious online recipe book.",
        link: "https://richardxhuang.github.io/GotFood/",
    },
    {
        img: "https://i.postimg.cc/MKSt2yXS/Snowbotix-Photo.png",
        description: "The Snowbotix company website.",
        link: "https://snowbotix.com/",
    },
    {
        img: "https://i.postimg.cc/pdpJYCcD/Akrobotix.png",
        description: "The Akrobotix company website",
        link: "https://agcs.akrobotix.com/",
    },
];

const contactConfig = {
    YOUR_EMAIL: "richxhuang@gmail.com",
    YOUR_FONE: "(301)237-8614",
    description: "Rockville, MD",
    // creat an emailjs.com account 
    // check out this tutorial https://www.emailjs.com/docs/examples/reactjs/
    YOUR_SERVICE_ID: "service_id",
    YOUR_TEMPLATE_ID: "template_id",
    YOUR_USER_ID: "user_id",
};

const socialprofils = {
    github: "https://github.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
};
export {
    meta,
    dataabout,
    dataportfolio,
    worktimeline,
    education,
    skills,
    services,
    introdata,
    contactConfig,
    socialprofils,
    logotext,
};