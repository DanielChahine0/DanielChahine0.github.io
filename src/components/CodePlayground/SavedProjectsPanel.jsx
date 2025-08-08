import React from "react";

export default function SavedProjectsPanel({ 
    savedProjects = [], 
    onLoadProject, 
    onDeleteProject 
}) {
    if (savedProjects.length === 0) return null;

    return (
        <div className="border-t border-border bg-card">
            <div className="px-4 py-2">
                <h3 className="font-medium text-foreground mb-2">
                    Saved Projects ({savedProjects.length})
                </h3>
                <div className="flex space-x-2 overflow-x-auto">
                    {savedProjects.map((project) => (
                        <div 
                            key={project.id} 
                            className="flex items-center space-x-2 bg-background rounded px-3 py-1 whitespace-nowrap border border-border"
                        >
                            <span className="text-sm font-medium">{project.name}</span>
                            <span className="text-xs text-muted-foreground">
                                {new Date(project.createdAt).toLocaleDateString()}
                            </span>
                            <button
                                onClick={() => onLoadProject?.(project)}
                                className="text-xs text-primary hover:underline px-1"
                                title="Load project"
                            >
                                Load
                            </button>
                            <button
                                onClick={() => onDeleteProject?.(project.id)}
                                className="text-xs text-destructive hover:underline px-1"
                                title="Delete project"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
