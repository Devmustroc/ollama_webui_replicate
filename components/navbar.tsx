import React from 'react';
import MobileSideBar from "@/components/mobile-side-bar";


const Navbar = async () => {

    return (
        <div className="flex items-center p-4">
            <MobileSideBar />
            <div
                className="flex w-full justify-end"
            >

            </div>
        </div>
    );
};

export default Navbar;