import Image from "next/image";
import { Product } from "@/src/types/product";
import WishList from "@/public/icons/Wishlist.svg"

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <div className="min-w-[270px]">
      {/* Image */}

      <div className="relative h-[250px] max-w-[270px] rounded bg-[#F5F5F5]">
        <span className="absolute left-3 top-3 z-10 rounded bg-[#DB4444] px-3 py-1 text-xs text-white">
          -{product.discountPercent}%
        </span>

        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
          <button className="rounded-full bg-white p-2">
            <Image src={WishList} alt={"wishlist"} height={16} width={16} />
          </button>

          <button className="rounded-full bg-white p-2">
            <Image src={WishList} alt={"eye"} height={16} width={16} />
          </button>
        </div>

        <Image
          fill
          src={product.image}
          alt={product.title}
          className="object-contain object-center p-5"
        />
      </div>

      {/* Content */}

      <div className="mt-4">
        <h3 className="text-[16px] font-medium leading-[24px]">
          {product.title}
        </h3>

        <div className="mt-2 flex items-center gap-3">
          <span className="font-medium text-[#DB4444]">
            ${product.salePrice}
          </span>

          <span className="text-gray-400 line-through">
            ${product.originalPrice}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span>⭐⭐⭐⭐⭐</span>

          <span className="text-sm text-gray-500">
            ({product.reviewCount})
          </span>
        </div>
      </div>
    </div>
  );
}