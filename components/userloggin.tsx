'use client';

import React, {useEffect, useState} from 'react';
import {Card, CardContent} from "@/components/ui/card";


const UserLoggin  = () => {

    const  [ mounted , setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null;

    return (
        <div
            className="px-3"
        >
            <Card
                className="bg-trasnparent flex justify-start items-center border-0"
            >
                <CardContent
                    className="text-center text-sm text-white mb-4 space-y-2"
                >
                    <div
                        className="flex justify-center items-start space-x-2 w-fit"
                    >
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserLoggin;