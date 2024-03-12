'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    useEffect(() => {
        const elements = [
            { selector: '.Contact', delay: 0.1 },
        ];

        elements.forEach(({ selector, delay }) => {
            gsap.fromTo(selector,
                { y: 50, opacity: 0 },
                {
                    duration: 0.5, y: 0, opacity: 1, delay, ease: "elastic.out(1.75, 0.75)",
                    scrollTrigger: {
                        trigger: selector,
                        toggleActions: "restart none restart none",
                    },
                }
            );
        });
    }, []);

    return (
        <div className="flex justify-center items-center flex-col mb-[150px]">
            <h2 className="text-[2rem] lg:text-[2.5rem] font-[1000] Contact opacity-0">Contact</h2>
            <h2 className="mt-6">Feel free to contact me.</h2>
            <div className="gap-2 mt-4 flex flex-wrap justify-center">
                <button
                    className="rounded-xl bg-[#4521d5] p-2 text-[#e2ddfe] hover:bg-[#3516b0] flex gap-3 items-center"
                    onClick={() => window.open('https://github.com/quercyAP', '_blank')}
                >
                    <Image src="/github.svg" alt="github" width={16} height={16} className="w-auto h-4" />
                    Github
                </button>
                <button
                    className="rounded-xl bg-[#4521d5]  p-2 text-[#e2ddfe] hover:bg-[#3516b0] flex gap-3 items-center"
                    onClick={() => window.open('https://www.linkedin.com/in/guillaume-lamazere-b7b814281/', '_blank')}
                >
                    <Image src="/linkedin.svg" alt="github" width={16} height={16} className="w-auto h-4" />
                    Linkedin
                </button>
                <button className="rounded-xl bg-[#4521d5]  p-2 text-[#e2ddfe] hover:bg-[#3516b0] flex gap-3 items-center">
                    <Image src="/mail.svg" alt="github" width={16} height={16} className="w-auto h-4" />
                    lamazereg@gmail.com
                </button>
            </div>
        </div>
    )
}