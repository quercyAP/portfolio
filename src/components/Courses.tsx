'use client';
import Cards from './Cards';
import { useEffect } from 'react';
import gsap from 'gsap';

const projectData = [
    {
        title: '42 Common Core',
        description: 'The 42 Common Core is a focused program in computer science and programming, covering algorithms, data structures, web, and app development, promoting hands-on learning and creativity.',
        stack: [
            { name: 'NextJS', icon: '/next-js.svg' },
            { name: 'NestJS', icon: '/nestjs.png' },
            { name: 'Docker', icon: '/docker.svg' },
            { name: 'Postgres', icon: '/postgresql.svg' },
            { name: 'C++', icon: '/C++.png' },
            { name: 'C', icon: '/c.svg' },
        ],
        githubLink: 'https://github.com/quercyAP/42-cursus'
    },
    {
        title: 'Unity and C# Training',
        description: 'Completed a Udemy course on C# and Unity for RPG game development',
        stack: [
            { name: 'CSharp', icon: '/c-sharp.svg' },
            { name: 'Unity', icon: '/unityblack.svg' },
        ],
        githubLink: 'https://github.com/quercyAP/UnityCourses'
    },
];

export default function Courses() {
    useEffect(() => {
        const elements = [
            { selector: '.courses', delay: 0.1 },
            { selector: '.card-container2', delay: 0.1, stagger: 0.1 }
        ];

        elements.forEach(({ selector, delay, stagger }) => {
            gsap.fromTo(selector,
                { y: 50, opacity: 0 },
                {
                    duration: 0.5, y: 0, opacity: 1, delay, ease: "elastic.out(1.75, 0.75)",
                    scrollTrigger: {
                        trigger: selector,
                        toggleActions: "restart none none none",
                    },
                    stagger
                }
            );
        });
    }, []);

    return (
        <div className="flex justify-center items-center flex-col mb-20 lg:mb-[200px]">
            <h2 className="text-[2rem] lg:text-[2.5rem] font-[1000] mb-10 courses opacity-0">Courses</h2>
            <div className="flex flex-col lg:flex-row justify-center gap-10 lg-gap[5rem]">
                {projectData.map((project, index) => (
                    <div key={index} className='flex-auto card-container2 opacity-0'>
                        <Cards
                            title={project.title}
                            description={project.description}
                            stack={project.stack}
                            githubLink={project.githubLink}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}