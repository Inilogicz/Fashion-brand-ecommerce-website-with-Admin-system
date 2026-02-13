"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    value: string;
    label?: string;
}

export function CopyButton({ value, label, className, ...props }: CopyButtonProps) {
    const [hasCopied, setHasCopied] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setHasCopied(false);
        }, 2000);
    }, [hasCopied]);

    const copyToClipboard = React.useCallback((value: string) => {
        navigator.clipboard.writeText(value);
        setHasCopied(true);
    }, []);

    return (
        <Button
            size="sm"
            variant="outline"
            className={cn("relative z-10 h-8 self-center", className)}
            onClick={() => copyToClipboard(value)}
            {...props}
        >
            <span className="sr-only">Copy</span>
            {hasCopied ? (
                <Check className="h-3 w-3 mr-2" />
            ) : (
                <Copy className="h-3 w-3 mr-2" />
            )}
            {label || value}
        </Button>
    );
}
