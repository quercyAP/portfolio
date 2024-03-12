'use client';
import Cards from './Cards';
import { useEffect } from 'react';
import gsap from 'gsap';

const projectData = [
    {
        title: 'Ft_Transcendance',
        description: 'Creating a website allowing users to play Pong online with real-time chat and matches.',
        stack: [
            { name: 'NextJS', icon: '/next-js.svg' },
            { name: 'NestJS', icon: '/nestjs.png' },
            { name: 'Docker', icon: '/docker.svg' },
            { name: 'Postgres', icon: '/postgresql.svg' },
        ],
        githubLink: 'https://42transcendance.fr/'
    },
    {
        title: 'WebServer',
        description: 'Non-blocking HTTP web server, configurable via an NGINX-like configuration file, with CGI functionality.',
        stack: [
            { name: 'C++', icon: '/C++.png' },
        ],
        githubLink: 'https://github.com/quercyAP/WebServ'
    },
    {
        title: 'MiniRT',
        description: 'Creating 3D scene through ray tracing representing illuminated scenes composed of simple geometric objects (planes, spheres, cylinders), with handling of transformations and lighting.',
        stack: [
            { name: 'C', icon: '/c.svg' },
        ],
        githubLink: 'https://github.com/quercyAP/MiniRT'
    },
];

export default function Projects() {
    useEffect(() => {
        const elements = [
            { selector: '.project', delay: 0.1 },
            { selector: '.card-container', delay: 0.3, stagger: 0.1 }
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
            <h2 className="text-[2rem] lg:text-[2.5rem] font-[1000] mb-10 project opacity-0">Projects</h2>
            <div className="flex flex-col lg:flex-row justify-center gap-10 lg:gap-[5rem]">
                {projectData.map((project, index) => (
                    <div key={index} className='flex-auto card-container opacity-0'>
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
    );
}
