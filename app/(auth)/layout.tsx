import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left Column: Editorial Image */}
            <div className="relative hidden lg:block bg-obsidian">
                <Image
                    src="/assets/hero-bg.png" // Fallback/Placeholder
                    alt="Dion Luxe Editorial"
                    fill
                    className="object-cover opacity-60 mix-blend-overlay"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-12 left-12 p-8 text-cream">
                    <h2 className="font-serif text-4xl mb-4">The Art of Refinement.</h2>
                    <p className="font-light opacity-80 max-w-md">Join our exclusive community for early access to new collections and curated experiences.</p>
                </div>
            </div>

            {/* Right Column: Form Container */}
            <div className="flex flex-col justify-center items-center bg-cream p-8 md:p-12 relative">
                <Link href="/" className="absolute top-8 left-8 inline-flex items-center text-sm text-obsidian/60 hover:text-obsidian transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Store
                </Link>

                <div className="w-full max-w-md space-y-8 animate-fade-in">
                    <div className="text-center">
                        <Link href="/" className="font-serif text-2xl tracking-widest text-obsidian uppercase">Dion Luxe</Link>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}
