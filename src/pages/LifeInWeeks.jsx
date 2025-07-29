import { useState, useEffect } from "react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { PageTransition } from "../components/PageTransition";
import { motion } from "framer-motion";
import { Calendar, Heart, Clock } from "lucide-react";

export default function LifeInWeeks() {
    const [birthDate, setBirthDate] = useState("");
    const [lifeExpectancy, setLifeExpectancy] = useState(80);
    const [weeks, setWeeks] = useState([]);
    const [stats, setStats] = useState({
        totalWeeks: 0,
        livedWeeks: 0,
        remainingWeeks: 0,
        currentAge: 0,
        weekProgress: 0
    });

    useEffect(() => {
        if (birthDate) {
            calculateWeeks();
        }
    }, [birthDate, lifeExpectancy]);

    const calculateWeeks = () => {
        const birth = new Date(birthDate);
        const now = new Date();
        const totalWeeksInLife = lifeExpectancy * 52; // 52 weeks per year
        
        // Calculate lived weeks
        const timeDiff = now.getTime() - birth.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
        const livedWeeks = Math.floor(daysDiff / 7);
        
        // Calculate current age
        const currentAge = (now.getFullYear() - birth.getFullYear()) - 
            (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);
        
        // Calculate progress within current week
        const weekProgress = (daysDiff % 7) / 7;
        
        const remainingWeeks = totalWeeksInLife - livedWeeks;
        
        setStats({
            totalWeeks: totalWeeksInLife,
            livedWeeks,
            remainingWeeks: Math.max(0, remainingWeeks),
            currentAge,
            weekProgress
        });

        // Generate weeks array for visualization
        const weeksArray = [];
        for (let i = 0; i < totalWeeksInLife; i++) {
            let status = 'future';
            if (i < livedWeeks) {
                status = 'lived';
            } else if (i === livedWeeks) {
                status = 'current';
            }
            
            weeksArray.push({
                id: i,
                status,
                year: Math.floor(i / 52),
                weekInYear: i % 52
            });
        }
        setWeeks(weeksArray);
    };

    const getWeekColor = (status) => {
        switch (status) {
            case 'lived': return 'bg-blue-500';
            case 'current': return 'bg-yellow-500';
            case 'future': return 'bg-gray-200';
            default: return 'bg-gray-200';
        }
    };

    const formatNumber = (num) => {
        return num.toLocaleString();
    };

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col bg-background">
                <NavBar />
                <main className="flex-1 container mx-auto px-4 py-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-6xl mx-auto"
                    >
                        <h1 className="text-4xl font-bold mb-8 text-center">Your Life in Weeks</h1>
                        
                        <div className="text-center mb-8 text-foreground/80">
                            <p>Each square represents one week of your life. This visualization helps put time into perspective.</p>
                        </div>

                        {/* Input Section */}
                        <div className="bg-card rounded-lg p-6 mb-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        <Calendar className="inline mr-2" size={16} />
                                        Your Birth Date
                                    </label>
                                    <input
                                        type="date"
                                        value={birthDate}
                                        onChange={(e) => setBirthDate(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md bg-background"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        <Heart className="inline mr-2" size={16} />
                                        Life Expectancy (years)
                                    </label>
                                    <input
                                        type="number"
                                        value={lifeExpectancy}
                                        onChange={(e) => setLifeExpectancy(parseInt(e.target.value) || 80)}
                                        className="w-full px-3 py-2 border rounded-md bg-background"
                                        min="1"
                                        max="120"
                                    />
                                </div>
                            </div>
                        </div>

                        {birthDate && (
                            <>
                                {/* Statistics */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="grid md:grid-cols-4 gap-4 mb-8"
                                >
                                    <div className="bg-card rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-blue-500">{stats.currentAge}</div>
                                        <div className="text-sm text-foreground/60">Years Old</div>
                                    </div>
                                    <div className="bg-card rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-blue-500">{formatNumber(stats.livedWeeks)}</div>
                                        <div className="text-sm text-foreground/60">Weeks Lived</div>
                                    </div>
                                    <div className="bg-card rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-green-500">{formatNumber(stats.remainingWeeks)}</div>
                                        <div className="text-sm text-foreground/60">Weeks Remaining</div>
                                    </div>
                                    <div className="bg-card rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-purple-500">
                                            {((stats.livedWeeks / stats.totalWeeks) * 100).toFixed(1)}%
                                        </div>
                                        <div className="text-sm text-foreground/60">Life Progress</div>
                                    </div>
                                </motion.div>

                                {/* Legend */}
                                <div className="flex justify-center gap-6 mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-blue-500 rounded"></div>
                                        <span className="text-sm">Weeks Lived</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                                        <span className="text-sm">Current Week</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-gray-200 rounded"></div>
                                        <span className="text-sm">Future Weeks</span>
                                    </div>
                                </div>

                                {/* Life Grid */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="bg-card rounded-lg p-6"
                                >
                                    <h2 className="text-xl font-semibold mb-4 text-center">
                                        <Clock className="inline mr-2" size={20} />
                                        Your Life Grid
                                    </h2>
                                    
                                    <div className="grid grid-cols-52 gap-1 max-h-96 overflow-y-auto">
                                        {weeks.map((week, index) => (
                                            <motion.div
                                                key={week.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ 
                                                    duration: 0.01, 
                                                    delay: index * 0.001 
                                                }}
                                                className={`w-2 h-2 rounded-sm ${getWeekColor(week.status)} hover:scale-150 transition-transform cursor-pointer`}
                                                title={`Week ${week.id + 1}, Year ${week.year + 1}, Status: ${week.status}`}
                                            />
                                        ))}
                                    </div>
                                    
                                    <div className="mt-4 text-center text-sm text-foreground/60">
                                        Each row represents one year (52 weeks). Hover over squares for details.
                                    </div>
                                </motion.div>

                                {/* Motivational Message */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                    className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-center"
                                >
                                    <h3 className="text-lg font-semibold mb-2">Make Every Week Count</h3>
                                    <p className="text-foreground/80">
                                        You have {formatNumber(stats.remainingWeeks)} weeks ahead of you. 
                                        What will you do with them?
                                    </p>
                                </motion.div>
                            </>
                        )}

                        {!birthDate && (
                            <div className="text-center py-12">
                                <p className="text-foreground/60">Enter your birth date above to visualize your life in weeks.</p>
                            </div>
                        )}
                    </motion.div>
                </main>
                <Footer />
            </div>
        </PageTransition>
    );
}
