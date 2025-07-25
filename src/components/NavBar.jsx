import { cn } from '@/lib/utils'
import { X, Menu, CodeXml } from 'lucide-react';
import { useEffect, useState } from 'react'
import { ThemeToggle } from './ThemeToggle'; // Import the ThemeToggle component
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom

const navItems = [
    { name: 'Timeline', href: '/timeline', isRoute: true },
    { name: 'Resume', href: '/files/resume.pdf', isRoute: false, download: true },
    { name: 'Contact', href: '#contact', isRoute: false },
]

export const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleNavigation = (href, isRoute = false) => {
        if (isRoute) {
            // Add a small delay for smooth transition
            setTimeout(() => {
                navigate(href);
            }, 50);
        }
        setIsMenuOpen(false);
    };

    return (
        <nav 
            className={cn(
                "fixed w-full z-40 transition-all duration-300",
                isScrolled
                    ? "pt-5"
                    : "py-4"
            )}
        >
            <div className={cn(
                'container flex items-center justify-between px-5 py-2 transition-all duration-300 relative overflow-hidden',
                isScrolled
                    ? "w-6/7 mx-auto rounded-lg bg-primary/30 backdrop-blur-xl shadow-inner"
                    : "w-full"
            )}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >
                {/* Additional glow layer - only when scrolled */}
                <div
                    className={cn(
                        "absolute pointer-events-none transition-opacity duration-75 z-0",
                        isHovered && isScrolled ? "opacity-75" : "opacity-0"
                    )}
                    style={{
                        left: mousePosition.x - 60,
                        top: mousePosition.y - 60,
                        width: 120,
                        height: 120,
                        background: `radial-gradient(
                            circle,
                            rgba(255, 255, 255, 0.22) 55%,
                            rgba(255, 255, 255, 0.12) 60%,
                            transparent 810%
                        )`,
                        borderRadius: '50%',
                        transform: 'translate3d(0, 0, 0)',
                        filter: 'blur(12px)',
                    }}
                />

                <button 
                    className='text-4xl font-bold flex items-center hover:scale-105 transition-transform duration-300 relative z-10 bg-transparent border-none cursor-pointer'
                    onClick={() => handleNavigation('/', true)}
                >
                    <span className='relative z-10 flex items-center gap-2'>
                        <CodeXml size={isScrolled ? 45 : 45}/>
                        <span className="text-2xl">
                            Daniel Chahine
                        </span>
                    </span>
                </button>

                {/* Desktop Version */}
                <div className='hidden md:flex items-center space-x-6 relative z-10'>
                    {navItems.map((item, key) => (
                        item.isRoute ? (
                            <button
                                onClick={() => handleNavigation(item.href, true)} 
                                key={key} 
                                className='text-foreground/80 transition-transform duration-300 hover:scale-120 cursor-pointer bg-transparent border-none'
                            >
                                {item.name}
                            </button>
                        ) : (
                            <a 
                                href={item.href} 
                                key={key} 
                                className='text-foreground/80 transition-transform duration-300 hover:scale-120'
                                {...(item.download ? { download: true } : {})}
                            >
                                {item.name}
                            </a>
                        )
                    ))}
                    <span className="hover:scale-130 transition-transform duration-300">
                        <ThemeToggle />
                    </span>
                </div>
        
                {/* Mobile Version */}
                <div className="flex items-center md:hidden relative z-10">
                    <span className="hover:scale-130 transition-transform duration-300">
                        <ThemeToggle />
                    </span>
                    <button
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        className="p-2 text-foreground z-50 hover:scale-130 transition-transform duration-300"
                        aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
            {/* Mobile menu overlay */}
            <div className={cn(
                "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col",
                "items-center justify-center transition-all md:hidden",
                isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}>
                {/* Close button inside overlay */}
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-6 right-6 p-2 text-foreground hover:scale-130 transition-transform duration-300"
                    aria-label="Close Menu"
                >
                    <X size={32} />
                </button>
                <div className='flex flex-col space-y-8 text-xl'>
                    {navItems.map((item, key) => (
                        item.isRoute ? (
                            <button
                                onClick={() => handleNavigation(item.href, true)} 
                                key={key} 
                                className='text-foreground/80 transition-transform duration-300 hover:scale-120 cursor-pointer bg-transparent border-none text-xl'
                            >
                                {item.name}
                            </button>
                        ) : (
                            <a 
                                href={item.href} 
                                key={key} 
                                className='text-foreground/80 transition-transform duration-300 hover:scale-120'
                                onClick={() => setIsMenuOpen(false)}
                                {...(item.download ? { download: true } : {})}
                            >
                                {item.name}
                            </a>
                        )
                    ))}
                </div>
            </div>
        </nav>
    );
}