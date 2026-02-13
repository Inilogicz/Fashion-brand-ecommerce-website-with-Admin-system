const { Client } = require('pg');

console.log('Testing pg with connection string only...');
// console.log(process.env.DATABASE_URL);

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    // Rely on sslmode=no-verify in URL
});

async function main() {
    try {
        await client.connect();
        console.log('✅ Connected with pg (string only)!');
        const res = await client.query('SELECT NOW()');
        console.log(res.rows[0]);
        await client.end();
    } catch (e) {
        console.error('❌ pg error:', e);
    }
}

main();
