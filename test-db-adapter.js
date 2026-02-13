const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

async function main() {
    console.log('Testing Prisma with pg adapter...');
    const connectionString = `${process.env.DATABASE_URL}`;
    // Ensure we use the pooler string (6543) which was failing before

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    try {
        await prisma.$connect();
        console.log('✅ Successfully connected via Adapter!');
        const count = await prisma.user.count();
        console.log('User count:', count);
    } catch (e) {
        console.error('❌ Adapter connection failed:', e);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
}

main();
