"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
    images: string[];
    name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
    // Ensure we always have at least one image/placeholder
    const safeImages = images.length > 0 ? images : ["/assets/placeholder.jpg"];
    const [selectedImage, setSelectedImage] = useState(safeImages[0]);

    return (
        <div className="space-y-4">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-beige/20 rounded-sm group">
                <Image
                    src={selectedImage}
                    alt={name}
                    fill
                    className="object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                />
            </div>
            {/* Thumbnail grid */}
            {safeImages.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                    {safeImages.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedImage(img)}
                            className={cn(
                                "relative aspect-square bg-beige/10 overflow-hidden cursor-pointer border-2 transition-all duration-200",
                                selectedImage === img ? "border-obsidian opacity-100" : "border-transparent opacity-70 hover:opacity-100"
                            )}
                        >
                            <Image src={img} alt={`${name} ${idx}`} fill className="object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
