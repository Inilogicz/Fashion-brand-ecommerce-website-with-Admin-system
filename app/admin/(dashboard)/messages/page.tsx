import { MessageSquare } from "lucide-react";

export default function AdminMessagesPage() {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
            <div className="h-16 w-16 bg-beige/20 rounded-full flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-obsidian/40" />
            </div>
            <h2 className="text-2xl font-serif font-medium text-obsidian">Messages</h2>
            <p className="text-obsidian/60 max-w-md">
                This feature is coming soon. You will be able to view and manage customer inquiries here.
            </p>
        </div>
    );
}
