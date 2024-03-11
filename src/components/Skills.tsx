'use client';
import Image from "next/image";
import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
    useEffect(() => {
        const elements = [
            { selector: '.title', delay: 0 },
            { selector: '.buttons2 img', delay: 0.2, stagger: 0.1 }
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
            <h2 className="text-[2rem] lg:text-[2.5rem] font-[1000] title opacity-0">Skills</h2>
            <div className="flex gap-5 lg:gap-[5rem] lg:m-10 buttons2 flex-wrap justify-center mt-4">
                <Image src="/C++.png" alt="Icon" width={50} height={50} className="opacity-0 w-auto h-16"/>
                <Image src="/c-sharp.svg" alt="Icon1" width={50} height={50} className="opacity-0 w-auto h-16"/>
                <Image src="/unity.svg" alt="Icon2" width={50} height={50} className="opacity-0 w-auto h-16"/>
                <Image src="/next-js.svg" alt="Icon3" width={50} height={50} className="opacity-0 w-auto h-16"/>
                <Image src="/nestjs.png" alt="Icon4" width={50} height={50} className="opacity-0 w-auto h-16"/>
                <Image src="/docker.svg" alt="Icon5" width={50} height={50} className="opacity-0 w-auto h-16"/>
            </div>
        </div>
    )
}
