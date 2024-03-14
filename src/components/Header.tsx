'use client';
import Image from "next/image";
import { useEffect } from 'react';
import gsap from 'gsap';

export default function Header() {
    useEffect(() => {
        const elements = [
            { selector: '.photo', delay: 0 },
            { selector: '.nom', delay: 0.2 },
            { selector: '.description', delay: 0.4 },
            { selector: '.buttons button', delay: 0.5, stagger: 0.05 }
        ];

        elements.forEach(({ selector, delay, stagger }) => {
            gsap.fromTo(selector,
                { y: 50, opacity: 0 },
                {
                    duration: 0.5, y: 0, opacity: 1, delay, ease: "elastic.out(1.75, 0.75)",
                    scrollTrigger: {
                        trigger: selector,
                        toggleActions: "restart none restart none",
                    },
                    stagger
                }
            );
        });
    }, []);

    return (
        <>
            <div className="flex justify-center items-center min-h-screen mb-20 lg:mb-0">
                <div className="flex lg:flex-row flex-col-reverse items-center">
                    <div className="flex flex-col max-w-[800px] ml-10 lg-ml-0 mr-10">
                        <h1 className="text-[3rem] lg:text-[5rem] lg:mb-[-2rem] font-[1000] nom opacity-0">Guillaume</h1>
                        <h1 className={`text-[3rem] lg:text-[5rem] font-[1000] nom opacity-0`}>Lamazere</h1>
                        <h2 className='text-[1.5rem] lg:text-[2.5rem] description opacity-0'>I&apos;m a <span style={{ fontWeight: 600 }}>Software Engineer</span> bridging the gap between complex coding challenges and creative problem-solving.</h2>
                        <div className="gap-4 mt-6 buttons flex flex-wrap">
                            <button 
                                className="rounded-xl bg-[#4521d5] p-2 text-[#e2ddfe] hover:bg-[#3516b0] opacity-0 flex gap-3 items-center"
                                onClick={() => window.open('https://github.com/quercyAP', '_blank')}
                            >
                                <Image src="/github.svg" alt="github" width={16} height={16} className="w-auto h-4"/>
                                Github
                            </button>
                            <button 
                                className="rounded-xl bg-[#4521d5]  p-2 text-[#e2ddfe] hover:bg-[#3516b0] opacity-0 flex gap-3 items-center"
                                onClick={() => window.open('https://www.linkedin.com/in/guillaume-lamazere-b7b814281/', '_blank')}
                                >
                                <Image src="/linkedin.svg" alt="github" width={16} height={16} className="w-auto h-4"/>
                                Linkedin
                            </button>
                            <button 
                                className="rounded-xl bg-[#4521d5]  p-2 text-[#e2ddfe] hover:bg-[#3516b0] opacity-0 flex gap-3 items-center"
                                onClick={() => window.open('mailto:lamazereg@gmail.com', '_blank')}
                            >
                                <Image src="/mail.svg" alt="github" width={16} height={16} className="w-auto h-4"/>
                                lamazereg@gmail.com
                            </button>
                        </div>
                    </div>
                    <div className="pt-10 lg:pt-[100px]">
                        <div className="w-40 h-40 lg:w-60 lg:h-60 rounded-full overflow-hidden relative photo opacity-0">
                            <Image src="/moi.png" alt="profil" width={400} height={400} priority={true} className="absolute bottom-15 left-0 w-full h-auto" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
