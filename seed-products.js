const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        },
    },
});

const CATEGORIES = [
    { name: "Outerwear", description: "Coats, jackets, and structured layers." },
    { name: "Dresses", description: "Elegant evening and day dresses." },
    { name: "Accessories", description: "Bags, scarves, and jewelry." },
    { name: "Knitwear", description: "Soft cashmere and wool knits." },
    { name: "Bottoms", description: "Trousers, skirts, and shorts." },
    { name: "Footwear", description: "Boots, heels, and flats." },
];

const PRODUCTS = [
    {
        name: "Obsidian Trench Coat",
        price: 850,
        categoryName: "Outerwear",
        slug: "obsidian-trench-coat",
        image: "/assets/brand-campaign-1.jpg",
        description: "A masterclass in tailoring. The Obsidian Trench Coat is crafted from premium Italian wool blend, featuring a structured silhouette that commands attention while remaining effortlessly understated. Finished with horn buttons and a silk lining.",
        stock: 10,
        isFeatured: true,
        sizes: ["S", "M", "L", "XL"]
    },
    {
        name: "Silk Essence Dress",
        price: 450,
        categoryName: "Dresses",
        slug: "silk-essence-dress",
        image: "/assets/brand-campaign-2.jpg",
        description: "Fluidity in motion. This pure silk slip dress drapes elegantly against the body, offering a lustrous sheen and unparalleled comfort. Designed for evening soirées or elevated daywear.",
        stock: 15,
        isFeatured: true,
        sizes: ["XS", "S", "M", "L"]
    },
    {
        name: "Minimalist Leather Tote",
        price: 320,
        categoryName: "Accessories",
        slug: "minimalist-leather-tote",
        image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1000&auto=format&fit=crop",
        description: "Function meets form. Crafted from full-grain vegetable-tanned leather, this tote features a spacious interior and minimal hardware. It develops a unique patina over time.",
        stock: 20,
        isFeatured: true,
        sizes: ["One Size"]
    },
    {
        name: "Cashmere Turtleneck",
        price: 290,
        categoryName: "Knitwear",
        slug: "cashmere-turtleneck",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop",
        description: "Luxurious warmth. Spun from the finest Grade A cashmere, this turtleneck offers a second-skin feel.",
        stock: 25,
        isFeatured: false,
        sizes: ["S", "M", "L", "XL"]
    },
    {
        name: "Tailored Wool Trousers",
        price: 350,
        categoryName: "Bottoms",
        slug: "tailored-wool-trousers",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop",
        description: "Sharp pleats and a relaxed fit. These high-waisted wool trousers are the foundation of any power suit.",
        stock: 12,
        isFeatured: false,
        sizes: ["28", "30", "32", "34", "36"]
    },
    {
        name: "Signature Derby Shoes",
        price: 550,
        categoryName: "Footwear",
        slug: "signature-derby-shoes",
        image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=1000&auto=format&fit=crop",
        description: "Handcrafted in Portugal. Smooth calfskin leather with a durable Goodyear welt construction.",
        stock: 8,
        isFeatured: false,
        sizes: ["40", "41", "42", "43", "44", "45"]
    }
];

async function main() {
    console.log('Seeding database...');

    // Upsert Categories
    const categoryMap = {};
    for (const cat of CATEGORIES) {
        const slug = cat.name.toLowerCase().replace(/ /g, '-');
        const upserted = await prisma.category.upsert({
            where: { slug: slug },
            update: {},
            create: {
                name: cat.name,
                description: cat.description,
                slug: slug,
            }
        });
        categoryMap[cat.name] = upserted.id;
        console.log(`Upserted category: ${cat.name}`);
    }

    // Upsert Products
    for (const prod of PRODUCTS) {
        const catId = categoryMap[prod.categoryName];
        if (!catId) {
            console.warn(`Category not found for product: ${prod.name}`);
            continue;
        }

        await prisma.product.upsert({
            where: { slug: prod.slug },
            update: {
                isFeatured: prod.isFeatured,
                images: [prod.image],
                sizes: prod.sizes || []
            },
            create: {
                name: prod.name,
                description: prod.description,
                price: prod.price,
                slug: prod.slug,
                stock: prod.stock,
                categoryId: catId,
                images: [prod.image],
                isFeatured: prod.isFeatured,
                sizes: prod.sizes || []
            }
        });
        console.log(`Upserted product: ${prod.name}`);
    }

    console.log('Seeding complete.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
