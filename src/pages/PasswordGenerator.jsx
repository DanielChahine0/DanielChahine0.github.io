import React, { useState, useCallback, useEffect } from 'react';
import { PageTransition } from '@/components/PageTransition';
import { NavBar } from '@/components/NavBar';
import { motion } from 'framer-motion';
import { Copy, RefreshCw, Shield, Check, AlertTriangle, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: false,
    excludeSimilar: false,
    excludeAmbiguous: false
  });
  const [strength, setStrength] = useState({ score: 0, label: 'Weak', color: 'text-red-500' });
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const { toast } = useToast();

  const characterSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    similar: 'il1Lo0O',
    ambiguous: '{}[]()/\\\'"`~,;.<>'
  };

  const calculateStrength = useCallback((pwd) => {
    let score = 0;
    let feedback = [];

    // Length check
    if (pwd.length >= 12) score += 25;
    else if (pwd.length >= 8) score += 15;
    else feedback.push('Use at least 8 characters');

    // Character variety
    if (/[a-z]/.test(pwd)) score += 15;
    else feedback.push('Include lowercase letters');

    if (/[A-Z]/.test(pwd)) score += 15;
    else feedback.push('Include uppercase letters');

    if (/[0-9]/.test(pwd)) score += 15;
    else feedback.push('Include numbers');

    if (/[^a-zA-Z0-9]/.test(pwd)) score += 25;
    else feedback.push('Include special characters');

    // Bonus for length
    if (pwd.length >= 16) score += 5;

    // Determine strength level
    let label, color;
    if (score >= 80) {
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

    return { score: Math.min(score, 100), label, color, feedback };
  }, []);

  const generatePassword = useCallback(() => {
    let charset = '';
    
    if (options.includeUppercase) charset += characterSets.uppercase;
    if (options.includeLowercase) charset += characterSets.lowercase;
    if (options.includeNumbers) charset += characterSets.numbers;
    if (options.includeSymbols) charset += characterSets.symbols;

    if (options.excludeSimilar) {
      charset = charset.split('').filter(char => !characterSets.similar.includes(char)).join('');
    }
    
    if (options.excludeAmbiguous) {
      charset = charset.split('').filter(char => !characterSets.ambiguous.includes(char)).join('');
    }

    if (charset === '') {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive"
      });
      return;
    }

    let result = '';
    const array = new Uint8Array(options.length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < options.length; i++) {
      result += charset.charAt(array[i] % charset.length);
    }

    // Ensure at least one character from each selected type
    const requiredChars = [];
    if (options.includeUppercase) requiredChars.push(characterSets.uppercase);
    if (options.includeLowercase) requiredChars.push(characterSets.lowercase);
    if (options.includeNumbers) requiredChars.push(characterSets.numbers);
    if (options.includeSymbols) requiredChars.push(characterSets.symbols);

    requiredChars.forEach((chars, index) => {
      const randomIndex = Math.floor(Math.random() * chars.length);
      const randomChar = chars[randomIndex];
      const replaceIndex = Math.floor(Math.random() * result.length);
      result = result.substring(0, replaceIndex) + randomChar + result.substring(replaceIndex + 1);
    });

    setPassword(result);
    setCopied(false);

    // Add to history
    setHistory(prev => {
      const newHistory = [{ password: result, timestamp: new Date() }, ...prev];
      return newHistory.slice(0, 10); // Keep only last 10
    });
  }, [options, toast]);

  useEffect(() => {
    generatePassword();
  }, [options.length, options.includeUppercase, options.includeLowercase, 
      options.includeNumbers, options.includeSymbols, options.excludeSimilar, 
      options.excludeAmbiguous]);

  useEffect(() => {
    if (password) {
      const strengthResult = calculateStrength(password);
      setStrength(strengthResult);
    }
  }, [password, calculateStrength]);

  const copyToClipboard = async () => {
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

  const updateOption = (key, value) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const presetConfigurations = [
    {
      name: 'High Security',
      config: { length: 16, includeUppercase: true, includeLowercase: true, includeNumbers: true, includeSymbols: true, excludeSimilar: true, excludeAmbiguous: true }
    },
    {
      name: 'Memorable',
      config: { length: 12, includeUppercase: true, includeLowercase: true, includeNumbers: true, includeSymbols: false, excludeSimilar: true, excludeAmbiguous: false }
    },
    {
      name: 'PIN Code',
      config: { length: 6, includeUppercase: false, includeLowercase: false, includeNumbers: true, includeSymbols: false, excludeSimilar: false, excludeAmbiguous: false }
    },
    {
      name: 'Simple',
      config: { length: 8, includeUppercase: true, includeLowercase: true, includeNumbers: false, includeSymbols: false, excludeSimilar: false, excludeAmbiguous: false }
    }
  ];

  const applyPreset = (config) => {
    setOptions(config);
  };

  return (
    <PageTransition className="min-h-screen bg-background">
      <NavBar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center">
                <Shield className="w-10 h-10 mr-3 text-primary" />
                Password Generator
              </h1>
              <p className="text-lg text-muted-foreground">
                Generate secure, customizable passwords for all your accounts
              </p>
            </div>

            {/* Generated Password Display */}
            <div className="bg-card rounded-lg p-6 mb-6 border border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Generated Password</h2>
                <div className="flex items-center space-x-2">
                  <Shield className={`w-5 h-5 ${strength.color}`} />
                  <span className={`font-medium ${strength.color}`}>{strength.label}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex-1 bg-background border border-border rounded-lg p-4 font-mono text-lg break-all">
                  {password || 'Click generate to create a password'}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={generatePassword}
                    className="p-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                    title="Generate new password"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Strength Meter */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Password Strength</span>
                  <span className="text-sm text-muted-foreground">{strength.score}/100</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      strength.score >= 80 ? 'bg-green-500' :
                      strength.score >= 60 ? 'bg-green-400' :
                      strength.score >= 40 ? 'bg-yellow-500' :
                      strength.score >= 20 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${strength.score}%` }}
                  />
                </div>
              </div>

              {strength.feedback && strength.feedback.length > 0 && (
                <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                  <AlertTriangle className="w-4 h-4 mt-0.5 text-yellow-500" />
                  <div>
                    <span className="font-medium">Suggestions:</span>
                    <ul className="list-disc list-inside ml-2">
                      {strength.feedback.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Configuration Options */}
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-xl font-semibold mb-4">Customize Options</h3>
                
                {/* Length Slider */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">Password Length</label>
                    <span className="text-sm text-muted-foreground">{options.length} characters</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="128"
                    value={options.length}
                    onChange={(e) => updateOption('length', parseInt(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Character Type Options */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Include Uppercase (A-Z)</label>
                    <input
                      type="checkbox"
                      checked={options.includeUppercase}
                      onChange={(e) => updateOption('includeUppercase', e.target.checked)}
                      className="rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Include Lowercase (a-z)</label>
                    <input
                      type="checkbox"
                      checked={options.includeLowercase}
                      onChange={(e) => updateOption('includeLowercase', e.target.checked)}
                      className="rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Include Numbers (0-9)</label>
                    <input
                      type="checkbox"
                      checked={options.includeNumbers}
                      onChange={(e) => updateOption('includeNumbers', e.target.checked)}
                      className="rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Include Symbols (!@#$...)</label>
                    <input
                      type="checkbox"
                      checked={options.includeSymbols}
                      onChange={(e) => updateOption('includeSymbols', e.target.checked)}
                      className="rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Exclude Similar (il1Lo0O)</label>
                    <input
                      type="checkbox"
                      checked={options.excludeSimilar}
                      onChange={(e) => updateOption('excludeSimilar', e.target.checked)}
                      className="rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Exclude Ambiguous ({}[]()...)</label>
                    <input
                      type="checkbox"
                      checked={options.excludeAmbiguous}
                      onChange={(e) => updateOption('excludeAmbiguous', e.target.checked)}
                      className="rounded"
                    />
                  </div>
                </div>

                {/* Preset Configurations */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-3">Quick Presets</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {presetConfigurations.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => applyPreset(preset.config)}
                        className="px-3 py-2 text-sm bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Password History */}
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-xl font-semibold mb-4">Recent Passwords</h3>
                
                {history.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Generated passwords will appear here
                  </p>
                ) : (
                  <div className="space-y-3">
                    {history.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-background rounded-lg border border-border"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-mono text-sm truncate">
                            {item.password}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                        <button
                          onClick={() => navigator.clipboard.writeText(item.password)}
                          className="ml-2 p-2 text-muted-foreground hover:text-foreground transition-colors"
                          title="Copy to clipboard"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Security Tips */}
            <div className="bg-card rounded-lg p-6 border border-border mt-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                Security Tips
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Password Best Practices</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Use unique passwords for each account</li>
                    <li>Minimum 12 characters length</li>
                    <li>Include mix of character types</li>
                    <li>Avoid personal information</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Storage & Management</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Use a password manager</li>
                    <li>Enable two-factor authentication</li>
                    <li>Update passwords regularly</li>
                    <li>Never share passwords</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default PasswordGenerator;
