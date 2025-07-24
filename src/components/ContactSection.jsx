import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { SiDevpost } from "react-icons/si";

export const ContactSection = () => {

    const {toast} = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        setTimeout(() => {
            toast({
                title: "Message Sent",
                description: "Thank you for reaching out! I will get back to you soon.",
                duration: 3000,
                variant: "success",
            });
            
        setIsSubmitting(false);
        }, 1000);

    }
    return (
        <section 
            id="contact"
            className="py-10 px-4 relative bg-secondary/30"
        >
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                    Get in Touch
                </h2>

                <p className="text-center text-muted-foreground mb-8 max-w-4xl mx-auto">
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>

                <div className="space-y-8">
                    
                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
                        <div className="flex flex-col items-center space-y-2 text-center">
                            <Mail className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                            <p className="text-sm md:text-base font-medium">Email</p>
                            <a 
                                href="mailto:chahinedaniel0@gmail.com" 
                                className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                chahinedaniel0@gmail.com
                            </a>
                        </div>
                        
                        <div className="flex flex-col items-center space-y-2 text-center">
                            <Phone className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                            <p className="text-sm md:text-base font-medium">Phone</p>
                            <a 
                                href="tel:+1234567890" 
                                className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                +1 (416) 209-2420
                            </a>
                        </div>
                        
                        <div className="flex flex-col items-center space-y-2 text-center">
                            <MapPin className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                            <p className="text-sm md:text-base font-medium">Location</p>
                            <p className="text-xs md:text-sm text-muted-foreground">
                                Toronto, Canada
                            </p>
                        </div>
                    </div>
                    
                    <div className="pt-8">
                        <h4 className="font-medium mb-4 text-center">Connect with me</h4>
                        <div className="flex space-x-4 justify-center">
                            <a href="https://www.linkedin.com/in/danielchahine/" target="_blank" rel="noopener noreferrer">
                                <FiLinkedin size={35}/>
                            </a>
                            <a href="https://github.com/DanielChahine0" target="_blank" rel="noopener noreferrer">
                                <FiGithub  size={35}/>
                            </a>
                            <a href="https://instagram.com/dxni.ch" target="_blank" rel="noopener noreferrer">
                                <FiInstagram  size={35}/>
                            </a>
                            <a href="https://leetcode.com/u/Chahinedaniel/" target="_blank" rel="noopener noreferrer">
                                <SiLeetcode  size={35}/>
                            </a>
                            <a href="https://devpost.com/chahinedaniel0" target="_blank" rel="noopener noreferrer">
                                <SiDevpost  size={35}/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}