import {useEffect, useState} from 'react';

export const CloudBackground = () => {
    const [clouds, setClouds] = useState([]);

    useEffect(() => {
        generateClouds();
    }, []);

    const generateClouds = () => {
        const numberOfClouds = Math.floor(window.innerWidth * window.innerHeight / 50000);
        const newClouds = [];

        for (let i = 0; i < numberOfClouds; i++) {
            const rand = Math.ceil(Math.random() * 3);
            newClouds.push({
                id: i,
                size: Math.random() * 50 + 20, // size between 20px and 70px
                x: Math.random() * 100,
                y: Math.random() * 100,
                animationDuration: Math.random() * 30 + 20, // duration between 20 and 50 seconds
                animationClass: `cloud-random-${rand}`
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