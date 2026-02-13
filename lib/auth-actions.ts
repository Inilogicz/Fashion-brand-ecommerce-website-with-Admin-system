'use server';

import { signIn, signOut } from '@/auth';

import { AuthError } from 'next-auth';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        const redirectTo = formData.get('redirectTo') as string | undefined;
        await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirectTo: redirectTo || undefined,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function signOutAction() {
    await signOut();
}
