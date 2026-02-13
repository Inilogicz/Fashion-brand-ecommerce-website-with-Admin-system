const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@dionluxe.com';
    const password = 'Password123!';
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            role: 'ADMIN', // Ensure existing user becomes ADMIN
            password: hashedPassword, // Reset password to known value
        },
        create: {
            email,
            name: 'Admin User',
            password: hashedPassword,
            role: 'ADMIN',
        },
    });

    console.log({ user });
    console.log(`\nAdmin user created/updated:`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`Login at: http://localhost:3000/login`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
