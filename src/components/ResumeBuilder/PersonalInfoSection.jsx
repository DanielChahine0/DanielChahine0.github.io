import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

export const PersonalInfoSection = ({ resumeData, updatePersonalInfo }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="border-b border-border pb-4">
        <h2 className="text-2xl font-semibold text-foreground flex items-center">
          <User className="w-6 h-6 mr-3 text-primary" />
          Personal Information
        </h2>
        <p className="text-muted-foreground mt-2">Enter your basic contact information</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={resumeData.personalInfo.fullName}
            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Email Address</label>
          <input
            type="email"
            placeholder="your.email@example.com"
            value={resumeData.personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Phone Number</label>
          <input
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={resumeData.personalInfo.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Location</label>
          <input
            type="text"
            placeholder="City, State/Country"
            value={resumeData.personalInfo.location}
            onChange={(e) => updatePersonalInfo('location', e.target.value)}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
      </div>
    </motion.div>
  );
};
