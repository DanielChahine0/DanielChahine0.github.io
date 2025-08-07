import React, { useState, useCallback, useEffect, useRef } from 'react';
import { PageTransition } from '@/components/PageTransition';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Copy, 
  RefreshCw, 
  Shield, 
  Check, 
  AlertTriangle, 
  Zap, 
  Eye, 
  EyeOff, 
  Download, 
  Upload, 
  Trash2, 
  Settings,
  Lock,
  Key,
  Target,
  BarChart3,
  Clock,
  Shuffle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [options, setOptions] = useState({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false,
    excludeAmbiguous: false,
    customCharset: '',
    useCustomOnly: false,
    minNumbers: 1,
    minUppercase: 1,
    minLowercase: 1,
    minSymbols: 1,
    enforceMinimums: true
  });
  const [strength, setStrength] = useState({ 
    score: 0, 
    label: 'Very Weak', 
    color: 'text-red-500',
    entropy: 0,
    feedback: [],
    crackTime: '0 seconds'
  });
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const characterSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?~`',
    similar: 'il1Lo0O',
    ambiguous: '{}[]()/\\\'"`~,;.<>',
    extendedSymbols: '¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿'
  };

  const calculateEntropy = useCallback((pwd, charset) => {
    const length = pwd.length;
    const charsetSize = charset.length;
    return length * Math.log2(charsetSize);
  }, []);

  const estimateCrackTime = useCallback((entropy) => {
    // Assuming 1 billion guesses per second for modern hardware
    const guessesPerSecond = 1e9;
    const totalCombinations = Math.pow(2, entropy);
    const averageGuesses = totalCombinations / 2;
    const seconds = averageGuesses / guessesPerSecond;
    
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 31536000000) return `${Math.round(seconds / 31536000)} years`;
    return `${Math.round(seconds / 31536000000)} millennia`;
  }, []);

  const analyzePassword = useCallback((pwd) => {
    const analysis = {
      length: pwd.length,
      uppercase: (pwd.match(/[A-Z]/g) || []).length,
      lowercase: (pwd.match(/[a-z]/g) || []).length,
      numbers: (pwd.match(/[0-9]/g) || []).length,
      symbols: (pwd.match(/[^a-zA-Z0-9]/g) || []).length,
      uniqueChars: new Set(pwd).size,
      repeatedChars: pwd.length - new Set(pwd).size,
      sequences: [],
      patterns: []
    };

    // Check for common sequences
    const sequences = ['abc', '123', 'qwe', 'asd', 'zxc'];
    sequences.forEach(seq => {
      if (pwd.toLowerCase().includes(seq)) {
        analysis.sequences.push(seq);
      }
    });

    // Check for repeated patterns
    for (let i = 2; i <= pwd.length / 2; i++) {
      const pattern = pwd.substring(0, i);
      if (pwd.includes(pattern.repeat(2))) {
        analysis.patterns.push(pattern);
      }
    }

    return analysis;
  }, []);

  const calculateStrength = useCallback((pwd) => {
    let score = 0;
    let feedback = [];
    
    if (!pwd) return { score: 0, label: 'No Password', color: 'text-gray-400', entropy: 0, feedback: [], crackTime: '0 seconds' };

    // Build effective charset
    let effectiveCharset = '';
    if (options.includeUppercase || /[A-Z]/.test(pwd)) effectiveCharset += characterSets.uppercase;
    if (options.includeLowercase || /[a-z]/.test(pwd)) effectiveCharset += characterSets.lowercase;
    if (options.includeNumbers || /[0-9]/.test(pwd)) effectiveCharset += characterSets.numbers;
    if (options.includeSymbols || /[^a-zA-Z0-9]/.test(pwd)) effectiveCharset += characterSets.symbols;
    
    // Remove duplicates and excluded characters
    effectiveCharset = [...new Set(effectiveCharset)].join('');
    if (options.excludeSimilar) {
      effectiveCharset = effectiveCharset.split('').filter(char => !characterSets.similar.includes(char)).join('');
    }
    if (options.excludeAmbiguous) {
      effectiveCharset = effectiveCharset.split('').filter(char => !characterSets.ambiguous.includes(char)).join('');
    }

    const entropy = calculateEntropy(pwd, effectiveCharset);
    const crackTime = estimateCrackTime(entropy);

    // Enhanced scoring algorithm
    // Length scoring (0-30 points)
    if (pwd.length >= 16) score += 30;
    else if (pwd.length >= 12) score += 20;
    else if (pwd.length >= 8) score += 10;
    else if (pwd.length >= 6) score += 5;
    else feedback.push('Use at least 8 characters');

    // Character variety (0-40 points)
    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasNumbers = /[0-9]/.test(pwd);
    const hasSymbols = /[^a-zA-Z0-9]/.test(pwd);

    if (hasLower) score += 8; else feedback.push('Include lowercase letters');
    if (hasUpper) score += 8; else feedback.push('Include uppercase letters');
    if (hasNumbers) score += 8; else feedback.push('Include numbers');
    if (hasSymbols) score += 16; else feedback.push('Include special characters');

    // Entropy bonus (0-20 points)
    if (entropy >= 60) score += 20;
    else if (entropy >= 40) score += 15;
    else if (entropy >= 30) score += 10;
    else if (entropy >= 20) score += 5;

    // Pattern penalties
    const analysis = analyzePassword(pwd);
    if (analysis.sequences.length > 0) {
      score -= analysis.sequences.length * 5;
      feedback.push(`Avoid common sequences (${analysis.sequences.join(', ')})`);
    }
    if (analysis.patterns.length > 0) {
      score -= analysis.patterns.length * 10;
      feedback.push('Avoid repeated patterns');
    }
    if (analysis.repeatedChars > pwd.length * 0.3) {
      score -= 10;
      feedback.push('Reduce character repetition');
    }

    // Bonus points
    if (pwd.length >= 20) score += 5; // Long password bonus
    if (analysis.uniqueChars === pwd.length) score += 5; // No repeated characters
    if (effectiveCharset.length >= 70) score += 5; // Large charset bonus

    // Determine strength level
    score = Math.max(0, Math.min(100, score));
    let label, color;
    
    if (score >= 90) {
      label = 'Excellent';
      color = 'text-emerald-600';
    } else if (score >= 80) {
      label = 'Very Strong';
      color = 'text-green-600';
    } else if (score >= 60) {
      label = 'Strong';
      color = 'text-green-500';
    } else if (score >= 40) {
      label = 'Fair';
      color = 'text-yellow-500';
    } else if (score >= 20) {
      label = 'Weak';
      color = 'text-orange-500';
    } else {
      label = 'Very Weak';
      color = 'text-red-500';
    }

    return { score, label, color, entropy, feedback, crackTime };
  }, [options, calculateEntropy, estimateCrackTime, analyzePassword, characterSets]);

  const generatePassword = useCallback(() => {
    setIsGenerating(true);
    
    // Simulate generation delay for better UX
    setTimeout(() => {
      let charset = '';
      
      // Build charset based on options
      if (options.useCustomOnly && options.customCharset) {
        charset = options.customCharset;
      } else {
        if (options.includeUppercase) charset += characterSets.uppercase;
        if (options.includeLowercase) charset += characterSets.lowercase;
        if (options.includeNumbers) charset += characterSets.numbers;
        if (options.includeSymbols) charset += characterSets.symbols;
        if (options.customCharset) charset += options.customCharset;
      }

      // Apply exclusions
      if (options.excludeSimilar) {
        charset = charset.split('').filter(char => !characterSets.similar.includes(char)).join('');
      }
      
      if (options.excludeAmbiguous) {
        charset = charset.split('').filter(char => !characterSets.ambiguous.includes(char)).join('');
      }

      // Remove duplicates
      charset = [...new Set(charset)].join('');

      if (charset === '') {
        toast({
          title: "Error",
          description: "Please select at least one character type",
          variant: "destructive"
        });
        setIsGenerating(false);
        return;
      }

      let result = '';
      const array = new Uint8Array(options.length);
      crypto.getRandomValues(array);
      
      for (let i = 0; i < options.length; i++) {
        result += charset.charAt(array[i] % charset.length);
      }

      // Ensure minimum requirements if enforced
      if (options.enforceMinimums && !options.useCustomOnly) {
        const requirements = [];
        if (options.includeUppercase) requirements.push({ chars: characterSets.uppercase, min: options.minUppercase });
        if (options.includeLowercase) requirements.push({ chars: characterSets.lowercase, min: options.minLowercase });
        if (options.includeNumbers) requirements.push({ chars: characterSets.numbers, min: options.minNumbers });
        if (options.includeSymbols) requirements.push({ chars: characterSets.symbols, min: options.minSymbols });

        requirements.forEach(req => {
          const currentCount = (result.match(new RegExp(`[${req.chars.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')}]`, 'g')) || []).length;
          const needed = Math.max(0, req.min - currentCount);
          
          for (let i = 0; i < needed; i++) {
            let availableChars = req.chars;
            if (options.excludeSimilar) {
              availableChars = availableChars.split('').filter(char => !characterSets.similar.includes(char)).join('');
            }
            if (options.excludeAmbiguous) {
              availableChars = availableChars.split('').filter(char => !characterSets.ambiguous.includes(char)).join('');
            }
            
            if (availableChars) {
              const randomIndex = Math.floor(Math.random() * availableChars.length);
              const randomChar = availableChars[randomIndex];
              const replaceIndex = Math.floor(Math.random() * result.length);
              result = result.substring(0, replaceIndex) + randomChar + result.substring(replaceIndex + 1);
            }
          }
        });
      }

      setPassword(result);
      setCopied(false);
      setAnalysis(analyzePassword(result));

      // Add to history with more metadata
      setHistory(prev => {
        const newHistory = [{ 
          password: result, 
          timestamp: new Date(),
          options: { ...options },
          strength: calculateStrength(result)
        }, ...prev];
        return newHistory.slice(0, 20); // Keep last 20
      });

      setIsGenerating(false);
    }, 150);
  }, [options, toast, analyzePassword, calculateStrength, characterSets]);

  useEffect(() => {
    // Generate initial password
    generatePassword();
  }, []); // Only run on mount

  // Inject custom styles for the range slider
  useEffect(() => {
    const styleId = 'password-generator-styles';
    let styleElement = document.getElementById(styleId);
    
    if (!styleElement) {
      const styles = `
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: hsl(var(--primary));
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transition: all 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: hsl(var(--primary));
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transition: all 0.2s ease;
        }
        
        .slider::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
      `;
      
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      styleElement.textContent = styles;
      document.head.appendChild(styleElement);
    }

    // Cleanup function to remove styles when component unmounts
    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []); // Only run on mount

  useEffect(() => {
    if (password) {
      const strengthResult = calculateStrength(password);
      setStrength(strengthResult);
    }
  }, [password, calculateStrength]);

  const copyToClipboard = async () => {
    if (!password) return;
    
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Password copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy password",
        variant: "destructive"
      });
    }
  };

  const copyHistoryPassword = async (pwd) => {
    try {
      await navigator.clipboard.writeText(pwd);
      toast({
        title: "Copied!",
        description: "Password copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy password",
        variant: "destructive"
      });
    }
  };

  const updateOption = (key, value) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const clearHistory = () => {
    setHistory([]);
    toast({
      title: "History Cleared",
      description: "Password history has been cleared",
    });
  };

  const exportConfig = () => {
    const config = {
      options,
      history: history.slice(0, 5), // Only export last 5 for privacy
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `password-generator-config-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Config Exported",
      description: "Configuration has been saved to file",
    });
  };

  const importConfig = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target.result);
        if (config.options) {
          setOptions(config.options);
          toast({
            title: "Config Imported",
            description: "Configuration has been loaded successfully",
          });
        }
        if (config.history && Array.isArray(config.history)) {
          setHistory(prev => [...config.history, ...prev].slice(0, 20));
        }
      } catch (error) {
        toast({
          title: "Import Error",
          description: "Invalid configuration file",
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
  };

  const presetConfigurations = [
    {
      name: 'Maximum Security',
      icon: <Shield className="w-4 h-4" />,
      description: 'Ultra-secure with all character types',
      config: { 
        length: 24, 
        includeUppercase: true, 
        includeLowercase: true, 
        includeNumbers: true, 
        includeSymbols: true, 
        excludeSimilar: true, 
        excludeAmbiguous: true,
        enforceMinimums: true,
        minNumbers: 2,
        minUppercase: 2,
        minLowercase: 2,
        minSymbols: 2
      }
    },
    {
      name: 'High Security',
      icon: <Lock className="w-4 h-4" />,
      description: 'Strong security for important accounts',
      config: { 
        length: 16, 
        includeUppercase: true, 
        includeLowercase: true, 
        includeNumbers: true, 
        includeSymbols: true, 
        excludeSimilar: true, 
        excludeAmbiguous: false,
        enforceMinimums: true,
        minNumbers: 1,
        minUppercase: 1,
        minLowercase: 1,
        minSymbols: 1
      }
    },
    {
      name: 'Memorable',
      icon: <Key className="w-4 h-4" />,
      description: 'Easier to remember and type',
      config: { 
        length: 12, 
        includeUppercase: true, 
        includeLowercase: true, 
        includeNumbers: true, 
        includeSymbols: false, 
        excludeSimilar: true, 
        excludeAmbiguous: false,
        enforceMinimums: false
      }
    },
    {
      name: 'PIN Code',
      icon: <Target className="w-4 h-4" />,
      description: 'Numeric only for PIN codes',
      config: { 
        length: 6, 
        includeUppercase: false, 
        includeLowercase: false, 
        includeNumbers: true, 
        includeSymbols: false, 
        excludeSimilar: false, 
        excludeAmbiguous: false,
        enforceMinimums: false
      }
    },
    {
      name: 'Simple Alpha',
      icon: <BarChart3 className="w-4 h-4" />,
      description: 'Letters only for basic use',
      config: { 
        length: 8, 
        includeUppercase: true, 
        includeLowercase: true, 
        includeNumbers: false, 
        includeSymbols: false, 
        excludeSimilar: false, 
        excludeAmbiguous: false,
        enforceMinimums: false
      }
    },
    {
      name: 'WiFi Password',
      icon: <Zap className="w-4 h-4" />,
      description: 'Good balance for WiFi networks',
      config: { 
        length: 16, 
        includeUppercase: true, 
        includeLowercase: true, 
        includeNumbers: true, 
        includeSymbols: false, 
        excludeSimilar: true, 
        excludeAmbiguous: true,
        enforceMinimums: true,
        minNumbers: 2,
        minUppercase: 2,
        minLowercase: 2,
        minSymbols: 0
      }
    }
  ];

  const applyPreset = (config) => {
    setOptions(config);
    toast({
      title: "Preset Applied",
      description: "Configuration updated successfully",
    });
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
            {/* Header */}
            <div className="text-center mb-8">
              <motion.h1 
                className="text-4xl font-bold mb-4 text-foreground"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Password Generator
              </motion.h1>
              <motion.p 
                className="text-foreground/80 max-w-2xl mx-auto mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Generate ultra-secure, customizable passwords with advanced entropy analysis and security insights
              </motion.p>
            </div>

            {/* Generated Password Display */}
            <motion.div 
              className="bg-card rounded-lg p-6 mb-6 border"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <Key className="w-5 h-5 mr-2 text-primary" />
                  Generated Password
                </h2>
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Shield className={`w-5 h-5 ${strength.color}`} />
                    <span className={`font-medium ${strength.color}`}>{strength.label}</span>
                    <span className="text-xs text-muted-foreground">
                      ({Math.round(strength.entropy)} bits)
                    </span>
                  </motion.div>
                  <button
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
                    title={isPasswordVisible ? "Hide password" : "Show password"}
                  >
                    {isPasswordVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex-1 bg-background border rounded-lg p-4 font-mono text-lg break-all relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    {password ? (
                      <motion.div
                        key={password}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {isPasswordVisible ? password : '●'.repeat(password.length)}
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-muted-foreground"
                      >
                        Click generate to create a password
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex flex-col space-y-2">
                  <motion.button
                    onClick={copyToClipboard}
                    className="p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 relative overflow-hidden group"
                    title="Copy to clipboard"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div
                          key="check"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                        >
                          <Check className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                        >
                          <Copy className="w-5 h-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                  <motion.button
                    onClick={generatePassword}
                    disabled={isGenerating}
                    className="p-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-all duration-200 disabled:opacity-50 relative overflow-hidden group"
                    title="Generate new password"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      animate={isGenerating ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <RefreshCw className="w-5 h-5" />
                    </motion.div>
                  </motion.button>
                </div>
              </div>

              {/* Enhanced Strength Meter */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Password Strength</span>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>{strength.score}/100</span>
                    <span>•</span>
                    <span>Crack time: {strength.crackTime}</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <motion.div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      strength.score >= 90 ? 'bg-emerald-500' :
                      strength.score >= 80 ? 'bg-green-500' :
                      strength.score >= 60 ? 'bg-green-400' :
                      strength.score >= 40 ? 'bg-yellow-500' :
                      strength.score >= 20 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${strength.score}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Password Analysis */}
              {analysis && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="bg-muted/50 rounded-lg p-3 mb-4"
                >
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Password Analysis
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div className="text-center">
                      <div className="font-medium text-foreground">{analysis.length}</div>
                      <div className="text-muted-foreground">Length</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-foreground">{analysis.uppercase}</div>
                      <div className="text-muted-foreground">Uppercase</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-foreground">{analysis.numbers}</div>
                      <div className="text-muted-foreground">Numbers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-foreground">{analysis.symbols}</div>
                      <div className="text-muted-foreground">Symbols</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Feedback */}
              <AnimatePresence>
                {strength.feedback && strength.feedback.length > 0 && (
                  <motion.div 
                    className="flex items-start space-x-2 text-sm text-muted-foreground bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <AlertTriangle className="w-4 h-4 mt-0.5 text-yellow-600 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-yellow-800 dark:text-yellow-200">Suggestions:</span>
                      <ul className="list-disc list-inside ml-2 space-y-1">
                        {strength.feedback.map((tip, index) => (
                          <li key={index} className="text-yellow-700 dark:text-yellow-300">{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Configuration Options */}
              <div className="lg:col-span-2">
                <motion.div 
                  className="bg-card rounded-lg p-6 border"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold flex items-center">
                      <Settings className="w-5 h-5 mr-2 text-primary" />
                      Customize Options
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={exportConfig}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
                        title="Export configuration"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
                        title="Import configuration"
                      >
                        <Upload className="w-4 h-4" />
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json"
                        onChange={importConfig}
                        className="hidden"
                      />
                    </div>
                  </div>
                
                  {/* Length Slider */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-medium">Password Length</label>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{options.length} characters</span>
                        <input
                          type="number"
                          min="4"
                          max="128"
                          value={options.length}
                          onChange={(e) => updateOption('length', Math.max(4, Math.min(128, parseInt(e.target.value) || 4)))}
                          className="w-16 px-2 py-1 text-xs border rounded bg-background"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min="4"
                        max="128"
                        value={options.length}
                        onChange={(e) => updateOption('length', parseInt(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>4</span>
                        <span>32</span>
                        <span>64</span>
                        <span>128</span>
                      </div>
                    </div>
                  </div>

                  {/* Character Type Options */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                          <div>
                            <label className="text-sm font-medium">Uppercase Letters</label>
                            <div className="text-xs text-muted-foreground">A-Z</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={options.includeUppercase}
                            onChange={(e) => updateOption('includeUppercase', e.target.checked)}
                            className="w-4 h-4 rounded"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                          <div>
                            <label className="text-sm font-medium">Lowercase Letters</label>
                            <div className="text-xs text-muted-foreground">a-z</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={options.includeLowercase}
                            onChange={(e) => updateOption('includeLowercase', e.target.checked)}
                            className="w-4 h-4 rounded"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                          <div>
                            <label className="text-sm font-medium">Numbers</label>
                            <div className="text-xs text-muted-foreground">0-9</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={options.includeNumbers}
                            onChange={(e) => updateOption('includeNumbers', e.target.checked)}
                            className="w-4 h-4 rounded"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                          <div>
                            <label className="text-sm font-medium">Special Characters</label>
                            <div className="text-xs text-muted-foreground">!@#$%^&*...</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={options.includeSymbols}
                            onChange={(e) => updateOption('includeSymbols', e.target.checked)}
                            className="w-4 h-4 rounded"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                          <div>
                            <label className="text-sm font-medium">Exclude Similar</label>
                            <div className="text-xs text-muted-foreground">il1Lo0O</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={options.excludeSimilar}
                            onChange={(e) => updateOption('excludeSimilar', e.target.checked)}
                            className="w-4 h-4 rounded"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                          <div>
                            <label className="text-sm font-medium">Exclude Ambiguous</label>
                            <div className="text-xs text-muted-foreground">{}[]()...</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={options.excludeAmbiguous}
                            onChange={(e) => updateOption('excludeAmbiguous', e.target.checked)}
                            className="w-4 h-4 rounded"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Advanced Options */}
                    <div className="border-t pt-4">
                      <button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="flex items-center justify-between w-full text-left mb-4 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <span className="text-sm font-medium">Advanced Options</span>
                        <motion.div
                          animate={{ rotate: showAdvanced ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <AlertTriangle className="w-4 h-4" />
                        </motion.div>
                      </button>
                      
                      <AnimatePresence>
                        {showAdvanced && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                          >
                            <div className="flex items-center justify-between p-3 rounded-lg border">
                              <div>
                                <label className="text-sm font-medium">Enforce Minimums</label>
                                <div className="text-xs text-muted-foreground">Ensure minimum count for each type</div>
                              </div>
                              <input
                                type="checkbox"
                                checked={options.enforceMinimums}
                                onChange={(e) => updateOption('enforceMinimums', e.target.checked)}
                                className="w-4 h-4 rounded"
                              />
                            </div>

                            {options.enforceMinimums && (
                              <div className="grid grid-cols-2 gap-4 p-3 bg-muted/30 rounded-lg">
                                {options.includeUppercase && (
                                  <div>
                                    <label className="text-xs font-medium">Min Uppercase</label>
                                    <input
                                      type="number"
                                      min="0"
                                      max="10"
                                      value={options.minUppercase}
                                      onChange={(e) => updateOption('minUppercase', Math.max(0, parseInt(e.target.value) || 0))}
                                      className="w-full px-2 py-1 text-xs border rounded bg-background mt-1"
                                    />
                                  </div>
                                )}
                                {options.includeLowercase && (
                                  <div>
                                    <label className="text-xs font-medium">Min Lowercase</label>
                                    <input
                                      type="number"
                                      min="0"
                                      max="10"
                                      value={options.minLowercase}
                                      onChange={(e) => updateOption('minLowercase', Math.max(0, parseInt(e.target.value) || 0))}
                                      className="w-full px-2 py-1 text-xs border rounded bg-background mt-1"
                                    />
                                  </div>
                                )}
                                {options.includeNumbers && (
                                  <div>
                                    <label className="text-xs font-medium">Min Numbers</label>
                                    <input
                                      type="number"
                                      min="0"
                                      max="10"
                                      value={options.minNumbers}
                                      onChange={(e) => updateOption('minNumbers', Math.max(0, parseInt(e.target.value) || 0))}
                                      className="w-full px-2 py-1 text-xs border rounded bg-background mt-1"
                                    />
                                  </div>
                                )}
                                {options.includeSymbols && (
                                  <div>
                                    <label className="text-xs font-medium">Min Symbols</label>
                                    <input
                                      type="number"
                                      min="0"
                                      max="10"
                                      value={options.minSymbols}
                                      onChange={(e) => updateOption('minSymbols', Math.max(0, parseInt(e.target.value) || 0))}
                                      className="w-full px-2 py-1 text-xs border rounded bg-background mt-1"
                                    />
                                  </div>
                                )}
                              </div>
                            )}

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">Custom Characters</label>
                                <input
                                  type="checkbox"
                                  checked={options.useCustomOnly}
                                  onChange={(e) => updateOption('useCustomOnly', e.target.checked)}
                                  className="w-4 h-4 rounded"
                                />
                              </div>
                              <input
                                type="text"
                                value={options.customCharset}
                                onChange={(e) => updateOption('customCharset', e.target.value)}
                                placeholder="Enter custom characters..."
                                className="w-full px-3 py-2 text-sm border rounded-lg bg-background"
                              />
                              <div className="text-xs text-muted-foreground">
                                {options.useCustomOnly ? 'Use only these characters' : 'Add these characters to selection'}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Quick Presets */}
                    <div className="border-t pt-4">
                      <h4 className="text-sm font-medium mb-3 flex items-center">
                        <Shuffle className="w-4 h-4 mr-2" />
                        Quick Presets
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {presetConfigurations.map((preset) => (
                          <motion.button
                            key={preset.name}
                            onClick={() => applyPreset(preset.config)}
                            className="p-3 text-left bg-secondary/50 hover:bg-secondary text-secondary-foreground rounded-lg transition-all duration-200 border border-transparent hover:border-primary/20"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center space-x-2 mb-1">
                              {preset.icon}
                              <span className="font-medium text-sm">{preset.name}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">{preset.description}</div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Password History */}
              <div className="lg:col-span-1">
                <motion.div 
                  className="bg-card rounded-lg p-6 border h-fit"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-primary" />
                      Recent Passwords
                    </h3>
                    {history.length > 0 && (
                      <button
                        onClick={clearHistory}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-muted"
                        title="Clear history"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  {history.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Generated passwords will appear here
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      <AnimatePresence>
                        {history.map((item, index) => (
                          <motion.div
                            key={`${item.password}-${item.timestamp.getTime()}`}
                            className="group p-3 bg-background rounded-lg border hover:border-primary/20 transition-all duration-200"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <div className="font-mono text-sm truncate mb-1">
                                  {isPasswordVisible ? item.password : '●'.repeat(item.password.length)}
                                </div>
                                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                  <span>{item.timestamp.toLocaleTimeString()}</span>
                                  <span>•</span>
                                  <span className={item.strength.color}>{item.strength.label}</span>
                                  <span>•</span>
                                  <span>{item.password.length} chars</span>
                                </div>
                                <div className="flex items-center space-x-1 mt-1">
                                  {item.options.includeUppercase && <span className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded">A</span>}
                                  {item.options.includeLowercase && <span className="px-1 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded">a</span>}
                                  {item.options.includeNumbers && <span className="px-1 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs rounded">1</span>}
                                  {item.options.includeSymbols && <span className="px-1 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs rounded">@</span>}
                                </div>
                              </div>
                              <div className="flex space-x-1 ml-2">
                                <button
                                  onClick={() => copyHistoryPassword(item.password)}
                                  className="p-2 text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100 rounded hover:bg-muted"
                                  title="Copy to clipboard"
                                >
                                  <Copy className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => {
                                    setPassword(item.password);
                                    setOptions(item.options);
                                  }}
                                  className="p-2 text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100 rounded hover:bg-muted"
                                  title="Use this configuration"
                                >
                                  <RefreshCw className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Security Best Practices */}
            <motion.div 
              className="bg-card rounded-lg p-6 border mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                Security Best Practices
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Password Strength</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Use at least 12-16 characters</li>
                        <li>• Include all character types</li>
                        <li>• Avoid dictionary words</li>
                        <li>• Don't use personal information</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <Key className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Password Management</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Use unique passwords for each account</li>
                        <li>• Use a password manager</li>
                        <li>• Enable two-factor authentication</li>
                        <li>• Update passwords regularly</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Security Warnings</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Never share passwords</li>
                        <li>• Don't save passwords in browsers</li>
                        <li>• Beware of phishing attempts</li>
                        <li>• Monitor account activity</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Privacy Notice</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      All passwords are generated locally in your browser using cryptographically secure random functions. 
                      No passwords are sent to any server or stored permanently unless you explicitly save them.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default PasswordGenerator;
