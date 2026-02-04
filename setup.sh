#!/bin/bash
# setup.sh

echo "Installing dependencies..."
npm install

echo "Installing additional packages..."
npm install clsx tailwind-merge lucide-react framer-motion resend @prisma/client prisma

echo "Generating Prisma Client..."
npx prisma generate

echo "Setup complete. Run 'npm run dev' to start."
