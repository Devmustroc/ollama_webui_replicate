import React from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Image from "next/image";

const UserAvatar = () => {
    return (
        <div>
            <Avatar
                className="h-8 w-8 gap-x-4"
            >
                <AvatarImage />
                <AvatarFallback>
                    <Image src="/avatar.png" alt="avatar" width={32} height={32} />
                </AvatarFallback>
            </Avatar>
        </div>
    );
};

export default UserAvatar;