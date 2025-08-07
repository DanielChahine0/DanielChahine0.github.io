export function Legend() {
    return (
        <div className="flex justify-center gap-6 mb-6">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded" aria-label="Weeks Lived"></div>
                <span className="text-sm">Weeks Lived</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded" aria-label="Current Week"></div>
                <span className="text-sm">Current Week</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded" aria-label="Future Weeks"></div>
                <span className="text-sm">Future Weeks</span>
            </div>
        </div>
    );
}
