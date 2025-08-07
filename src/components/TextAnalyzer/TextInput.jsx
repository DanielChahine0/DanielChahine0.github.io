import { motion } from "framer-motion";

export function TextInput({ text, setText, templates, selectedTemplate, setSelectedTemplate, toast }) {
    const loadTemplate = (templateKey) => {
        if (templates[templateKey]) {
            setText(templates[templateKey].text);
            setSelectedTemplate(templateKey);
            toast({
                title: "Template loaded!",
                description: `${templates[templateKey].name} template has been loaded.`
            });
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-3"
        >
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-3 mt-3 border border-border/50 shadow-lg shadow-black/5">
                {/* Template Selector */}
                <div className="mb-3">
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Load Template:
                    </label>
                    <select
                        value={selectedTemplate}
                        onChange={(e) => e.target.value ? loadTemplate(e.target.value) : null}
                        className="w-full p-2 border border-border/50 rounded-lg bg-background/50 text-foreground text-sm transition-all duration-200"
                    >
                        <option value="">Choose a template...</option>
                        {Object.entries(templates).map(([key, template]) => (
                            <option key={key} value={key}>{template.name}</option>
                        ))}
                    </select>
                </div>
                
                {/* Removed 'Enter your text' label for cleaner UI */}
                <textarea
                    id="text-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste or type your text here to analyze... The more text you provide, the more accurate the analysis will be!"
                    className="w-full h-160 p-1 border border-border/50 rounded-xl bg-background/50 text-neutral-900 resize-none  transition-all duration-200 placeholder:text-foreground backdrop-blur-sm"
                />
                <div className="flex justify-between items-center mt-2">
                    <div className="flex gap-1">
                        <button
                            onClick={() => setText("")}
                            className="px-2 py-1 text-sm text-foreground dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-red-600/50 rounded-lg transition-all duration-200"
                        >
                            Clear
                        </button>
                        <button
                            onClick={() => setText("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nThis is a wonderful example of positive sentiment analysis. The results should be amazing and fantastic! I love how this tool provides incredible insights into text analysis. It's truly outstanding and delivers excellent performance.\n\nOn the other hand, some people might feel frustrated or disappointed with poor quality content. Bad writing can be terrible and awful to read.")}
                            className="px-2 py-1 text-sm text-foreground hover:bg-teal-300/50 rounded-lg transition-all duration-200"
                        >
                            Load Sample
                        </button>
                    </div>
                    <div className="text-sm text-foreground/50">
                        {text.length > 0 && `${text.length} characters`}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
