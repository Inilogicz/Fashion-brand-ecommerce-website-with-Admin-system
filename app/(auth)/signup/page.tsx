import SignupForm from '@/components/auth/signup-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign Up | Dion Luxe',
    description: 'Create a new account',
};

export default function SignupPage() {
    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-serif text-obsidian">Create Account</h1>
                <p className="text-sm text-obsidian/60">Join to access exclusive collections</p>
            </div>
            <SignupForm />
        </div>
    );
}
