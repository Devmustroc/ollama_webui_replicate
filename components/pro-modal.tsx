'use client';

import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {useModalPro} from "@/hooks/use-modalpro";

import {Badge} from "@/components/ui/badge";
import {
    BatteryCharging,
    Check,
    Image,
    MessageSquare,
    MusicIcon,
    ShieldX,
    VideoIcon, Zap
} from "lucide-react";
import {Card} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";

const tools = [
    {
        label: "Conversation",
        icon: MessageSquare,
        color: "text-violet-700",
    },
    {
        label: "Generate Image",
        icon: Image,
        color: "text-pink-700",
        bgColor: "bg-pink-700/10",
    },
    {
        label: "Generate Music",
        icon: MusicIcon,
        color: "text-sky-500",
        bgColor: "bg-sky-500/10",
    },
    {
        label: "Generate Video",
        icon: VideoIcon,
        color: "text-orange-700",
        bgColor: "bg-orange-700/10",
    },
    {
        label: "Code",
        icon: MessageSquare,
        color: "text-green-700",
        bgColor: "bg-green-700/10",
    },
    {
        label: "Uncensored",
        icon: ShieldX,
        color: "text-amber-300",
        bgColor: "bg-amber-300/10",
    },
]


const ProModal = () => {
    const proModal = useModalPro()
    return (
        <Dialog
            open={proModal.isOpen}
            onOpenChange={proModal.onClose}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle
                        className="flex items-center flex-col gap-y-2 pb-2"
                    >
                        <div
                            className="flex items-center gap-x-2 font-bold py-1"
                        >
                            Upgrade To Genesis
                            <Badge
                                variant="premium"
                                className="text-sm p-y-1 uppercase"
                            >
                                Pro
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription
                        className="text-center pt-2 space-y-2 text-zinc-900 font-medium"
                    >

                        {
                            tools.map((tool) => {
                                return (
                                    <Card
                                        key={tool.label}
                                        className="p-3 border-black/5 flex items-center justify-between"
                                    >
                                        <div
                                            className="flex items-center gap-x-4 "
                                        >
                                            <div
                                                className={cn(`
                                                    p-2 w-fit rounded-md
                                                `, tool.bgColor)}
                                                >
                                                <tool.icon
                                                    className={cn("w-8 h-8", tool.color)}
                                                />
                                            </div>
                                            <div
                                                className={cn("text-lg font-semibold")}
                                            >
                                                {tool.label}
                                            </div>
                                        </div>
                                        <Check
                                            className={cn("w-8 h-8", "text-green-700")}
                                        />
                                    </Card>
                                )
                            })
                        }
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        size="lg"
                        variant="premium"
                        className="w-full justify-center text-md"
                    >
                        Upgrade
                        <Zap
                            className="w-6 h-6 ml-2 fill-green-500"
                        />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ProModal;