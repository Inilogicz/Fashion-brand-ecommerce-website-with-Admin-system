"use client";

import dynamic from "next/dynamic";

const CheckoutInner = dynamic(() => import("./checkout-inner"), { ssr: false });

export default function ClientWrapper({ user }: { user?: any }) {
    return <CheckoutInner user={user} />;
}
