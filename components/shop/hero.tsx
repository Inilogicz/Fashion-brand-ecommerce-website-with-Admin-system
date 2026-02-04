"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const subTextRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Video Parallax
        if (videoRef.current) {
            gsap.to(videoRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
                y: 100, // Slight parallax
                scale: 1.1,
                ease: "none",
            });
        }

        // Text Reveal (Staggered Words)
        const words = textRef.current?.querySelectorAll(".word");
        if (words) {
            gsap.fromTo(words,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: "power3.out",
                    delay: 0.2
                }
            );
        }

        // Subtext Wipe
        gsap.fromTo(subTextRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: "power3.out" }
        );

        // CTA Fade In
        gsap.fromTo(ctaRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 1, ease: "power3.out" }
        );

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-[100vh] w-full overflow-hidden bg-beige">
            {/* Background Video */}
            <div className="absolute inset-0 overflow-hidden">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover scale-[1.05]"
                >
                    {/* User provided video to be placed in public/hero-video.mp4 */}
                    <source src="/hero-video.mp4" type="video/mp4" />
                    {/* Fallback to previous placeholder if needed, or keeping it as a backup comment */}
                    {/* <source src="https://cdn.pixabay.com/video/2020/05/25/40123-424930030_large.mp4" type="video/mp4" /> */}
                    {/* Fallback Image */}
                    <img src="/assets/hero-bg.png" alt="Hero Background" className="h-full w-full object-cover" />
                </video>
            </div>

            {/* Overlays for readability */}
            <div className="absolute inset-0 bg-black/20" /> {/* Dimmer */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            <div className="relative flex h-full items-center justify-center text-center px-4 z-10">
                <div className="max-w-5xl">
                    {/* Headline with manual word splitting for GSAP */}
                    <div ref={textRef} className="font-serif text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter text-white/90 leading-tight">
                        <span className="inline-block overflow-hidden"><span className="word inline-block">Designed</span></span>{" "}
                        <span className="inline-block overflow-hidden"><span className="word inline-block">for</span></span>{" "}
                        <span className="inline-block overflow-hidden"><span className="word inline-block">the</span></span> <br />
                        <span className="italic text-cream inline-block overflow-hidden"><span className="word inline-block">evolving</span></span>{" "}
                        <span className="italic text-cream inline-block overflow-hidden"><span className="word inline-block">mind.</span></span>
                    </div>

                    <p
                        ref={subTextRef}
                        className="mt-8 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed text-white/80"
                    >
                        A classic-futuristic fashion house merging timeless minimalism with forward-thinking creativity.
                        Crafted for global minds who value artistry, exclusivity, comfort, and class.
                    </p>

                    <div ref={ctaRef} className="mt-12 flex flex-col md:flex-row gap-4 justify-center">
                        <Link
                            href="/shop"
                            className="group relative inline-flex items-center justify-center gap-3 bg-white px-10 py-4 text-sm uppercase tracking-widest text-obsidian transition-transform duration-300 hover:scale-105 hover:bg-cream"
                        >
                            <span>Explore Collection</span>
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="/story"
                            className="group inline-flex items-center justify-center gap-3 border border-white px-10 py-4 text-sm uppercase tracking-widest text-white transition-colors duration-300 hover:bg-white hover:text-obsidian"
                        >
                            <span>Our Story</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-pulse">
                <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                <div className="h-12 w-[1px] bg-white/30" />
            </div>
        </section>
    );
}
