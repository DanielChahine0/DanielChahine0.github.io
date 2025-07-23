import { cn } from '@/lib/utils'
import { X, Menu, CodeXml } from 'lucide-react';
import { useEffect, useState } from 'react'
import { ThemeToggle } from './ThemeToggle'; // Import the ThemeToggle component
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const navItems = [
    { name: 'Timeline', href: '/timeline', isRoute: true },
    { name: 'Skills', href: '#skills', isRoute: false },
    { name: 'Projects', href: '#projects', isRoute: false },
    { name: 'Contact', href: '#contact', isRoute: false },
    { name: 'Resume', href: '#', isRoute: false },
]

export const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                'container flex items-center justify-between px-5 py-2 transition-all duration-300',
                isScrolled
                    ? "w-6/7 mx-auto rounded-lg bg-primary/30 backdrop-blur-xl shadow-inner"
                    : "w-full"
            )}>
                <Link 
                    className='text-4xl font-bold flex items-center hover:scale-105 transition-transform duration-300'
                    to="/"
                >
                    <span className='relative z-10 flex items-center gap-2'>
                        <CodeXml size={isScrolled ? 45 : 45}/>
                        <span className="text-2xl">
                            Daniel Chahine
                        </span>
                    </span>
                </Link>

                {/* Desktop Version */}
                <div className='hidden md:flex items-center space-x-6'>
                    {navItems.map((item, key) => (
                        item.isRoute ? (
                            <Link 
                                to={item.href} 
                                key={key} 
                                className='text-foreground/80 hover:text-primary transition-colors duration-200'
                            >
                                {item.name}
                            </Link>
                        ) : (
                            <a 
                                href={item.href} 
                                key={key} 
                                className='text-foreground/80 hover:text-primary transition-colors duration-200'
                            >
                                {item.name}
                            </a>
                        )
                    ))}
                    <ThemeToggle />
                </div>
        
                {/* Mobile Version */}
                <div className="flex items-center md:hidden">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        className="p-2 text-foreground z-50"
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
                    className="absolute top-6 right-6 p-2 text-foreground"
                    aria-label="Close Menu"
                >
                    <X size={32} />
                </button>
                <div className='flex flex-col space-y-8 text-xl'>
                    {navItems.map((item, key) => (
                        item.isRoute ? (
                            <Link 
                                to={item.href} 
                                key={key} 
                                className='text-foreground/80 hover:text-primary transition-colors duration-200'
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ) : (
                            <a 
                                href={item.href} 
                                key={key} 
                                className='text-foreground/80 hover:text-primary transition-colors duration-200'
                                onClick={() => setIsMenuOpen(false)}
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