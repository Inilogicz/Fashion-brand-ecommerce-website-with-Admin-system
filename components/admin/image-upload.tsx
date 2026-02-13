"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
    value: string[];
    onChange: (value: string[]) => void;
    onRemove: (value: string) => void;
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);

    const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        const newUrls: string[] = [];

        try {
            // Upload files sequentially or in parallel
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const formData = new FormData();
                formData.append("file", file);

                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!res.ok) {
                    console.error(`Failed to upload ${file.name}`);
                    continue; // Skip failed uploads
                }

                const data = await res.json();
                if (data.url) {
                    newUrls.push(data.url);
                }
            }

            // Update parent state with new URLs appended to existing ones
            onChange([...value, ...newUrls]);
        } catch (error) {
            console.error("Upload error:", error);
            alert("Something went wrong during upload.");
        } finally {
            setIsUploading(false);
            // Reset input
            e.target.value = "";
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[100px] h-[100px] rounded-md overflow-hidden border border-beige/20 group">
                        <div className="absolute top-1 right-1 z-10">
                            <Button
                                type="button"
                                onClick={() => onRemove(url)}
                                variant="destructive"
                                size="icon"
                                className="h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={url}
                        />
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        id="image-upload"
                        onChange={onUpload}
                        disabled={isUploading}
                    />
                    <label
                        htmlFor="image-upload"
                        className={`inline-flex items-center gap-2 px-4 py-2 bg-obsidian text-cream rounded-md cursor-pointer hover:bg-cocoa transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <Upload className="h-4 w-4" />
                        {isUploading ? "Uploading..." : "Upload Images"}
                    </label>
                </div>
                <div className="text-xs text-obsidian/50">
                    Supported formats: .jpg, .png, .webp
                </div>
            </div>
        </div>
    );
}
