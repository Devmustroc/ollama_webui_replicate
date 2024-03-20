'use client';

import React, {useEffect, useState, FC } from 'react';
import {MenuIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar";




const MobileSideBar= () => {
    const [isMounted, setISMounted] = useState(false);

    useEffect(() => {
        setISMounted(true)
    }, []);

    if (!isMounted) return null

    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <MenuIcon />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
};

export default MobileSideBar;