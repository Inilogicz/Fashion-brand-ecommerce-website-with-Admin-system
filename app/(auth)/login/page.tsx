import LoginForm from '@/components/auth/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login | Dion Luxe',
    description: 'Login to your account',
};

import { Suspense } from 'react';

export default function LoginPage() {
    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-serif text-obsidian">Welcome Back</h1>
                <p className="text-sm text-obsidian/60">Enter your credentials to access your account</p>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <LoginForm />
            </Suspense>
        </div>
    );
}
