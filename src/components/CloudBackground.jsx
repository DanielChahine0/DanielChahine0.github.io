import {useEffect, useState} from 'react';

export const CloudBackground = () => {
    const [clouds, setClouds] = useState([]);

    useEffect(() => {
        generateClouds();
    }, []);

    const generateClouds = () => {
        const numberOfClouds = Math.floor(window.innerWidth * window.innerHeight / 50000);
        const newClouds = [];

        for (let i = 0; i < numberOfClouds * 2; i+=3) {
            const rand = Math.ceil(Math.random() * 3);
            
            const size1 = Math.random() * 20 + 30; // Main cloud size
            const size0 = size1 *  (Math.random()*0.1 + 0.8); // Smaller cloud size on the left
            const size2 = size1 * (Math.random()*0.1 + 0.8); // Smaller cloud size on the right

            const x1 = Math.random() * 100; // Main cloud x position
            const x0 = x1 - 1.2; // Smaller cloud x position on the left
            const x2 = x1 + 1.2; // Smaller cloud x position on the right

            const yFixed = Math.random() * 100; // Random y position

            const animationDurationFixed = Math.random() * 30 + 20; // duration between 20 and 50 seconds
            const cloudClass = `cloud-random-${rand}`;
            const sideShift = 0.01;

            newClouds.push({
                id: i,
                size: size0,
                x: x0,
                y: yFixed + size0 * sideShift,
                animationDuration: animationDurationFixed, // duration between 20 and 50 seconds
                animationClass: cloudClass
            });

            newClouds.push({
                id: i+1,
                size: size2,
                x: x2,
                y: yFixed + size2 * sideShift, // Adjust y position for the right cloud
                animationDuration: animationDurationFixed, // duration between 20 and 50 seconds
                animationClass: cloudClass
            });
            
            newClouds.push({
                id: i+2,
                size: size1,
                x: x1,
                y: yFixed,
                animationDuration: animationDurationFixed, // duration between 20 and 50 seconds
                animationClass: cloudClass
            });
        }

        setClouds(newClouds);
    };

    return (
        <div className='fixed inset-0 overflow-hidden pointer-events-none z-0'>
            {clouds.map((cloud) => (
                <div 
                    key={cloud.id}
                    className={`cloud ${cloud.animationClass}`}
                    style={{
                        width: cloud.size + "px",
                        height: cloud.size + "px",
                        left: cloud.x + "%",
                        top: cloud.y + "%",
                        animationDuration: cloud.animationDuration + "s"
                    }}
                />
            ))}
        </div>
    );
}