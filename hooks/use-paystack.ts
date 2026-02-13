import { useEffect, useState } from 'react';

export interface PaystackProps {
    publicKey: string;
    email: string;
    amount: number;
    firstname?: string;
    lastname?: string;
    phone?: string;
    reference?: string;
    metadata?: any;
    currency?: string;
    channels?: string[];
    label?: string;
    plan?: string;
    quantity?: number;
    subaccount?: string;
    transaction_charge?: number;
    bearer?: string;
}

export const usePaystackPayment = (config: PaystackProps) => {
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        if (document.getElementById('paystack-script')) {
            setScriptLoaded(true);
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://js.paystack.co/v1/inline.js';
        script.id = 'paystack-script';
        script.async = true;
        script.onload = () => setScriptLoaded(true);
        document.body.appendChild(script);
    }, []);

    const initializePayment = ({ onSuccess, onClose }: { onSuccess: (reference: any) => void, onClose: () => void }) => {
        if (scriptLoaded && (window as any).PaystackPop) {
            const paystackConfig = {
                key: config.publicKey,
                email: config.email,
                amount: config.amount,
                currency: 'NGN',
                ref: config.reference,
                metadata: config.metadata,
                callback: (response: any) => {
                    onSuccess(response);
                },
                onClose: () => {
                    onClose();
                },
            };
            const handler = (window as any).PaystackPop.setup(paystackConfig);
            handler.openIframe();
        } else {
            console.warn("Paystack script not loaded yet");
        }
    };

    return initializePayment;
};
