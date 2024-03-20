import React, {FC} from 'react';
import Image from "next/image";


interface EmptyProps {
    label: string,
}

const Empty: FC<EmptyProps> = ({ label }) => {
    return (
        <div className="h-full p-20 flex flex-col items-center justify-center gap-4
        ">
            <div
                className="relative h-72 w-72"
            >
                <Image alt="Empty" src="/empty.png" layout="fill" objectFit="contain" />
            </div>
            <p
                className="text-muted-foreground text-sm text-center"
            >
                {label}
            </p>
        </div>
    );
};

export default Empty;