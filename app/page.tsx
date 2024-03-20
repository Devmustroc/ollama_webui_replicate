'use client';

import React from 'react';
import {
    ArrowRightCircleIcon,
} from "lucide-react";
import {Card} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
import Image from "next/image";


const tools = [
    {
        label: "Conversation",
        src: "/icons/conversation.png",
        description: "Generate text conversation",
        color: "text-violet-700",
        bgColor: "bg-violet-700/10",
        href: "/conversation",
        size: 50
    },
    {
        label: "Generate Image",
        src: "/icons/image.png",
        color: "text-pink-700",
        bgColor: "bg-pink-700/10",
        href: "/image"
    },
    {
        label: "Generate Music",
        src: "/icons/music.png",
        color: "text-sky-500",
        bgColor: "bg-sky-500/10",
        href: "/music"
    },
    {
        label: "Generate Video",
        src: "/icons/video.png",
        color: "text-orange-700",
        bgColor: "bg-orange-700/10",
        href: "/video"
    },
    {
        label: "Code",
        src: "/icons/code.png",
        color: "text-green-700",
        bgColor: "bg-green-700/10",
        href: "/code"
    }

]

const DashboardPage = () => {
    const router = useRouter();

    return (
        <div
            className='flex flex-col space-y-6 justify-center'
        >
            <div
                className="mb-12 space-y-4 mt-10 px-4 md:px-20 lg:px-32 items-center"
            >
                <h2
                    className="text-2xl md:text-4xl font-bold text-center"
                >
                    Generate You Code Using Your Favorite IA Tools
                </h2>
                <p
                        className="text-muted-foreground font-light text-sm md:text-lg text-center"
                >
                    Welcome to the Ollama Model IA dashboard. Here you can generate images, videos, music, and more.
                </p>
            </div>
            <div
                className="px-4 md:px-20 lg:px-32 space-y-4 mt-8"
            >
                {
                    tools.map((tool) => {
                        return (
                            <Card
                                onClick={() => router.push(tool.href)}
                                key={tool.href}
                                className="p-4
                                bg-white dark:from-gray-800 dark:to-gray-900 shadow-md
                                hover:bg-gradient-to-r from-amber-300/30 to-amber-500/60 text-amber-900 hover:from-amber-400 hover:to-amber-600 hover:shadow-md rounded-lg border border-black/5 flex items-center justify-between transition-all duration-200 ease-in-out"
                            >
                                <div
                                    className="flex items-center gap-x-4"
                                >
                                    <div
                                        className={cn(`
                                            w-fit p-2 rounded-md
                                        `, tool.bgColor)}
                                    >
                                        <Image alt={tool.label} width={50} height={50} src={tool.src} className={cn("w-8 h-8", tool.color)}/>
                                    </div>
                                    <div
                                        className="font-semibold text-lg md:text-xl text-black dark:text-white"
                                    >
                                        {tool.label}
                                        <div
                                            className="text-muted-foreground text-sm md:text-base"
                                        >
                                            <p>
                                                {tool.description}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                                <ArrowRightCircleIcon className={cn("w-8 h-8")}/>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default DashboardPage;