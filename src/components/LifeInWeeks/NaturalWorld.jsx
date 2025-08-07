import { motion } from "framer-motion";
import { TreePine } from "lucide-react";

export function NaturalWorld({ 
    birthDate, 
    currentAge,
    formatNumber 
}) {
    const birth = new Date(birthDate);
    const now = new Date();
    const ageInDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 3600 * 24));
    const ageInYears = currentAge;
    const lunarCycles = Math.floor(ageInDays / 29.53);
    const tripsAroundSun = Math.floor(ageInYears);
    const sequoiaComparison = ((ageInYears / 3000) * 100).toFixed(2);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-6 p-6 bg-card rounded-lg"
            aria-label="Natural World"
        >
            <h3 className="text-lg font-semibold mb-4 text-center flex items-center justify-center">
                <TreePine className="mr-2" size={20} />
                Natural World
            </h3>
            <div className="text-foreground/80 space-y-2">
                <p>
                    You've experienced approximately <strong title="Lunar cycles">{formatNumber(lunarCycles)}</strong> lunar cycles and <strong title="Trips around Sun">{formatNumber(tripsAroundSun)}</strong> trips around the Sun.
                </p>
                <p>
                    A giant sequoia tree can live over 3,000 years. Your current age is <strong title="Percent of sequoia lifespan">{sequoiaComparison}%</strong> of its potential lifespan.
                </p>
                <p>
                    During your lifetime, your body has replaced most of its cells several times. You are not made of the same atoms you were born with.
                </p>
            </div>
        </motion.div>
    );
}
