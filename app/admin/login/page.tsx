import AdminLoginForm from '@/components/admin/admin-login-form';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Admin Login | Dion Luxe',
    description: 'Login to the admin dashboard',
};

export default function AdminLoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-cream px-4 py-8">
            <div className="w-full max-w-sm space-y-6 rounded-xl border border-beige/20 bg-white p-8 shadow-sm">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-serif text-obsidian">Admin Portal</h1>
                    <p className="text-sm text-obsidian/60">Enter your credentials to access the dashboard</p>
                </div>

                <Suspense fallback={<div>Loading...</div>}>
                    <AdminLoginForm />
                </Suspense>
            </div>
        </div>
    );
}
