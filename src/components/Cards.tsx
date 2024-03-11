'use client';
import Image from 'next/image';

interface TechStack {
    name: string;
    icon: string;
}

interface CardsProps {
    title: string;
    description: string;
    stack: TechStack[];
    githubLink: string;
}

export default function Cards({ title, description, stack, githubLink }: CardsProps) {
    const handleCardClick = () => {
        window.open(githubLink, '_blank');
    };
    
    return (
        <div
            style={{
                boxShadow: '0 0 0 1px rgba(82, 64, 156, 1)'
            }}
            className="bg-[#33255b] rounded-xl p-6 text-white space-y-4 max-w-[300px] transition duration-300 hover:bg-[#291f43] cursor-pointer"
            onClick={handleCardClick}
            >
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <p className='text-white opacity-50'>{description}</p>
            <div className="flex flex-wrap gap-2">
                {stack.map((tech, index) => (
                    <div key={index} className='flex flex-row items-center space-x-2 bg-[#c4b4ff] rounded-xl px-3 h-6 hover:bg-[#aa93ff]'>
                        <Image src={tech.icon} alt={`${tech.name} Icon`} width={16} height={16}/>
                        <p className="text-sm text-black">{tech.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
