import ProductCard from "@/src/components/common/ProductCard";
import { flashSaleProducts } from "@/src/store/flash-sale-products";

export default function TestPage() {
  return (
    <div className="p-10">
      <ProductCard
        product={flashSaleProducts[0]}
      />
    </div>
  );
}