import { useEffect, useState } from 'react';

// each star will have id, size, x, y, opacity, animationDuration

export const StarBackground = () => {
    const [stars, setStars] = useState([]);
    const [meteors, setMeteors] = useState([]);

    useEffect(() => {
        generateStars();
        generateMeteors();

        const handleResize = () => {
            generateStars();
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    const generateStars = () => {
        const numberOfStars = Math.floor(window.innerWidth * window.innerHeight / 50000);
        const newStars = [];

        for (let i = 0; i < numberOfStars; i++) {
            newStars.push({
                id: i,
                size: Math.random() * 3 + 1,
                x: Math.random() * 100,
                y: Math.random() * 100,
                opacity: Math.random() * 0.5 + 0.5, // opacity between 0.5 and 1
                animationDuration: Math.random() * 5 + 5 // duration between 5 and 10 seconds
            });
        }

        setStars(newStars);
    };

    const generateMeteors = () => {
        const numberOfMeteors = Math.random() * 7;
        const newMeteors = [];

        for (let i = 0; i < numberOfMeteors; i++) {
            newMeteors.push({
                id: i,
                size: Math.random() * 4,
                x: Math.random() * 100,
                y: Math.random() * 20, // start from the top
                animationDelay: Math.random() * 15 + 5, // random delay for each meteor
                animationDuration: Math.random() * 20 + 5 // duration between 5 and 10 seconds
            });
        }

        setMeteors(newMeteors);
    };

    return (
        <div className='fixed inset-0 overflow-hidden pointer-events-none z-0'>
            {stars.map((star) => (
                <div
                    key={star.id}
                    className='star animate-pulse-subtle'
                    style={{
                        width: star.size + "px",
                        height: star.size + "px",
                        left: star.x + "%",
                        top: star.y + "%",
                        opacity: star.opacity,
                        animationDuration: star.animationDuration + "s",
                    }}
                />
            ))}

            {meteors.map((meteor) => (
                <div
                    key={meteor.id}
                    className='meteor animate-meteor'
                    style={{
                        width: meteor.size * 50 + "px",
                        height: meteor.size + "px",
                        left: meteor.x + "%",
                        top: meteor.y + "%",
                        animationDelay: meteor.animationDelay,
                        animationDuration: meteor.animationDuration + "s",
                    }}
                />
            ))}
        </div>
    );
}