import { ProductDetails } from "@/features/products/components/ProductDetails";
import { mockProducts } from "@/features/products/services/products.mock-data";

export default async function ProductDetailsRoute({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = mockProducts.find((item) => item.id === productId) ?? mockProducts[0];

  return <ProductDetails product={product} />;
}