const { PrismaClient } = require('@prisma/client');

// IP from nslookup: 54.247.26.119 or 18.202.64.2
const IP = '54.247.26.119';

const configs = [
    {
        name: 'IP 6543 (sslmode=no-verify)',
        url: process.env.DATABASE_URL.replace('aws-1-eu-west-1.pooler.supabase.com', IP)
    },
    {
        name: 'IP 5432 (sslmode=no-verify)',
        url: process.env.DATABASE_URL.replace('aws-1-eu-west-1.pooler.supabase.com', IP).replace(':6543', ':5432').replace('pgbouncer=true&', '')
    }
];

async function test(currentConfig) {
    console.log(`\n--- Testing ${currentConfig.name} ---`);
    // console.log('URL:', currentConfig.url); 

    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: currentConfig.url
            }
        },
        // log: ['info'] 
    });

    try {
        await prisma.$connect();
        console.log('✅ Success!');
        const count = await prisma.user.count();
        console.log('User count:', count);
        await prisma.$disconnect();
        return true;
    } catch (e) {
        console.log('❌ Failed');
        console.log(e.message);
        await prisma.$disconnect();
        return false;
    }
}

async function main() {
    console.log('Starting connection tests (IP)...');
    for (const config of configs) {
        if (await test(config)) break;
    }
}

main();
