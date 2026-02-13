import { Settings } from "lucide-react";

export default function AdminSettingsPage() {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
            <div className="h-16 w-16 bg-beige/20 rounded-full flex items-center justify-center">
                <Settings className="h-8 w-8 text-obsidian/40" />
            </div>
            <h2 className="text-2xl font-serif font-medium text-obsidian">Settings</h2>
            <p className="text-obsidian/60 max-w-md">
                Store configuration settings will be available here.
            </p>
        </div>
    );
}
