'use client';

import React, { FC } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Montserrat } from 'next/font/google';
import {
    Code,
    ImageIcon,
    LayoutDashboardIcon,
    MessageCircle, Music, Settings, ShieldXIcon, VideoIcon
} from "lucide-react";
import {usePathname} from "next/navigation";
import UserLoggin from "@/components/userloggin";

const montserrat = Montserrat({ weight: "600", subsets: ['latin']})


const routes =  [
    {
        label: "Dashboard",
        icon: LayoutDashboardIcon,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Conversation",
        icon: MessageCircle,
        href: "/conversation",
        color: "text-violet-500",
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700",
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-700",
    },
    {
        label: "Music Generation",
        icon: Music,
        href: "/music",
        color: "text-sky-500",
    },
    {
        label: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-green-700",
    }

]

const Sidebar= () => {

    const pathname = usePathname()
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-amber-800 text-white">
            <div
                className="px-3 py-2 flex-1"
            >
                <div
                    className="space-y-2"
                >
                    {routes.map((route) =>
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(`text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-slate-900/50 rounded-lg
                                    transition-all duration-200 ease-in-out`, pathname === route.href ? "text-white bg-slate-900/50" : "text-white hover:bg-white/10")}
                        >
                            <div
                                className="flex items-center pl-3"
                            >
                                {
                                    pathname === route.href ? (
                                        <route.icon className={cn("w-6 h-6 mr-3", route.color)} />
                                    ) : (<></>)
                                }
                                {route.label}
                            </div>
                        </Link>
                    )}
                </div>
            </div>
            <UserLoggin />
        </div>
    );
};

export default Sidebar;