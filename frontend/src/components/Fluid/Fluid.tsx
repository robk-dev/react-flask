import React, { useEffect, FC } from 'react'

import './Fluid.css';

export const Fluid: FC = () => {

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "./fluid-script.js";
        script.async = true;
        document.body.appendChild(script);
    }, [])
    return (
        <canvas className="fluid-canvas" style={{
            color: 'white',
            height: '100%', // Canvas is will respond to size changes without resetting fluid!
            width: '100%',
            margin: 0
        }}></canvas>
    );
}
