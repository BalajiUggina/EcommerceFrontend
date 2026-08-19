"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/src/types/product";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { addToCart } from "@/src/store/slices/cartSlice";
import { toggleWishlist } from "@/src/store/slices/wishlistSlice";
import { Heart, Eye, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  showTrash?: boolean;
  onTrashClick?: () => void;
}

export default function ProductCard({
  product,
  showTrash = false,
  onTrashClick,
}: ProductCardProps) {
  const dispatch = useAppDispatch();
  
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        product,
        quantity: 1,
        size: product.sizes?.[0] || "M",
        color: product.colors?.[0] || "",
      })
    );
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
    if (isInWishlist) {
      toast.info(`Removed ${product.name} from wishlist.`);
    } else {
      toast.success(`Added ${product.name} to wishlist!`);
    }
  };

  return (
    <div className="min-w-[270px] max-w-[270px] group">
      {/* Image Container */}
      <div className="relative h-[250px] rounded bg-bg-secondary overflow-hidden flex items-center justify-center">
        {/* Discount Badge */}
        {product.discountPercent > 0 && (
          <span className="badge-discount">
            -{product.discountPercent}%
          </span>
        )}

        {/* Top-right Actions */}
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
          {showTrash ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onTrashClick) onTrashClick();
              }}
              className="icon-button-circle text-red-500"
            >
              <ShoppingCart size={16} />
            </button>
          ) : (
            <button
              onClick={handleWishlistToggle}
              className="icon-button-circle"
            >
              <Heart
                size={16}
                className={isInWishlist ? "fill-primary text-primary" : "text-black"}
              />
            </button>
          )}

          <Link href={`/products/${product.id}`} className="icon-button-circle flex items-center justify-center">
            <Eye size={16} className="text-black" />
          </Link>
        </div>

        {/* Product Main Image */}
        <Link href={`/products/${product.id}`} className="relative w-full h-[180px] block">
          <Image
            fill
            alt={product.name}
            src={
              (typeof product.images?.[0] === "string" && product.images[0].trim() !== "")
                ? product.images[0]
                : (product.images?.[0] as any)?.image && typeof (product.images?.[0] as any)?.image === "string" && (product.images?.[0] as any)?.image.trim() !== ""
                ? (product.images?.[0] as any).image
                : (product.image && typeof product.image === "string" && product.image.trim() !== "")
                ? product.image
                : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23ccc' stroke-width='2'%3E%3Crect width='18' height='18' x='3' y='3' rx='2' ry='2'/%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/%3E%3C/svg%3E"
            }
            className="object-contain object-center p-4 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Quick Add to Cart Panel (Hover style) */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 right-0 bg-black text-white text-sm py-2.5 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShoppingCart size={15} /> Add To Cart
        </button>
      </div>

      {/* Content */}
      <div className="mt-4">
        <Link href={`/products/${product.id}`} className="hover:underline">
          <h3 className="text-[16px] font-medium leading-[24px] text-black truncate">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-3">
          <span className="font-medium text-primary">
            ${product.selling_price}
          </span>
          {product.discountPercent > 0 && (
            <span className="text-gray-400 line-through">
              ${product.original_price}
            </span>
          )}
        </div>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < 3 ? "fill-current" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            ({50})
          </span>
        </div>
      </div>
    </div>
  );
}