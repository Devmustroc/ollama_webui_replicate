import React from 'react';
import {Circles} from "react-loader-spinner";

const Loader = () => {
    return (
        <div
            className="h-full flex flex--col gap-y-4 items-center justify-center"
        >
            <div
                className="w-10 h-10"
            >
                <Circles
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>

            
        </div>
    );
};

export default Loader;