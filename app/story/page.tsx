import Image from "next/image";

export default function StoryPage() {
    return (
        <div className="min-h-screen bg-cream">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-obsidian/30 z-10" />
                <Image
                    src="/assets/hero-bg.png"
                    alt="Fabric details"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <h1 className="text-5xl md:text-7xl font-serif text-cream text-center">
                        The Story
                    </h1>
                </div>
            </div>

            {/* Content Sections */}
            <div className="max-w-4xl mx-auto px-6 py-24 space-y-24">

                {/* Section 1 */}
                <section className="text-center">
                    <span className="text-sm uppercase tracking-widest text-[#C2A891] mb-4 block">Our Philosophy</span>
                    <h2 className="text-3xl md:text-4xl font-serif text-obsidian mb-8">Quiet Luxury for the Evolving Mind</h2>
                    <p className="text-lg md:text-xl font-light text-obsidian/70 leading-relaxed">
                        Dion Luxe was born from a desire to strip away the noise. In a world shouting for attention, we choose to whisper.
                        We believe that true luxury lies not in logos or loud prints, but in the integrity of the fabric,
                        the precision of the cut, and the feeling of wearing something that simply works.
                    </p>
                </section>

                {/* Image Break */}
                <div className="relative h-[400px] w-full rounded-sm overflow-hidden bg-beige/20">
                    <Image
                        src="/assets/brand-campaign-3.jpg" // Placeholder fallback
                        alt="Atelier"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Section 2 */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="text-2xl font-serif text-obsidian mb-4">Craftsmanship</h3>
                        <p className="font-light text-obsidian/70 leading-relaxed">
                            Every piece is a dialogue between tradition and modernity.
                            We source our materials from sustainable mills in Italy and Japan,
                            focusing on natural fibers that breathe and age gracefully—silk, wool, linen, and organic cotton.
                            <br /><br />
                            Our production is small-batch, ensuring that every seam is inspected and every detail is intentional.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-serif text-obsidian mb-4">Sustainability</h3>
                        <p className="font-light text-obsidian/70 leading-relaxed">
                            We don't follow trends; we follow longevity. By ignoring the seasonal calendar,
                            we create pieces meant to be worn for years, not weeks.
                            We advocate for a wardrobe of fewer, better things.
                        </p>
                    </div>
                </section>

                {/* Signature */}
                <section className="text-center pt-12 border-t border-beige/20">
                    <img src="/assets/logo-full.jpg" alt="Dion Luxe Signature" className="h-16 w-auto mx-auto mix-blend-multiply opacity-80" />
                    <p className="mt-6 text-sm italic text-obsidian/60">Established 2026</p>
                </section>

            </div>
        </div>
    );
}
