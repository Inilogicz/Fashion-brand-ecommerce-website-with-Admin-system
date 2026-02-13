import { auth } from "@/auth";
import ClientWrapper from "./client-wrapper";

export default async function CheckoutPage() {
    const session = await auth();
    return <ClientWrapper user={session?.user} />;
}
