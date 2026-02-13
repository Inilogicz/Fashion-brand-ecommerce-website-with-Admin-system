import { getCollections, getFeaturedProducts } from "@/lib/shop-actions";
import { HomeClient } from "@/components/shop/home-client";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const collections = await getCollections();

  return <HomeClient featuredProducts={featuredProducts} collections={collections} />;
}
