import { Github, Instagram, Linkedin, Mail, MapPin, Phone, Send, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

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
            className="py-24 px-4 relative bg-secondary/30"
        >
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                    Get in Touch
                </h2>

                <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>

                    <div className="space-y-8">
                        <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-6 flex-col items-center">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/20 ">
                                    <Mail className="h-6 w-6"/>
                                </div>
                                <div>
                                    <h4 className="font-medium">
                                        Email
                                    </h4>
                                    <a href="mailto:chahinedaniel0@gmail.com"
                                       className="text-muted-foreground hover:text-primary transition-colors">
                                        chahinedaniel0@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/20 ">
                                    <Phone className="h-6 w-6"/>
                                </div>
                                <div>
                                    <h4 className="font-medium">
                                        Phone
                                    </h4>
                                    <a href="tel:+11234567890"
                                       className="text-muted-foreground hover:text-primary transition-colors">
                                        +1(123)-456-7890
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/20 ">
                                    <MapPin className="h-6 w-6"/>
                                </div>
                                <div>
                                    <h4 className="font-medium">
                                        Location
                                    </h4>
                                    <a className="text-muted-foreground hover:text-primary transition-colors">
                                        Toronto, ON, Canada
                                    </a>
                                </div>
                            </div>

                        </div>

                        <div className="pt-8">
                            <h4 className="font-medium mb-4">Connect with me</h4>
                            <div className="flex space-x-4 justify-center">
                                <a href="https://www.linkedin.com/in/danielchahine/" target="_blank">
                                    <Linkedin />
                                </a>

                                <a href="https://twitter.com/your_twitter" target="_blank">
                                    <Twitter />
                                </a>
                                
                                <a href="https://github.com/DanielChahine0" target="_blank">
                                    <Github />
                                </a>

                                <a href="https://instagram.com/your_instagram" target="_blank">
                                    <Instagram />
                                </a>
                            </div>
                        </div>
                    </div>

            </div>
        </section>
    );
}