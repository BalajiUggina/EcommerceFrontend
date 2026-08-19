"use client";

import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { addToCart } from "@/src/store/slices/cartSlice";
import { removeFromWishlist, clearWishlist } from "@/src/store/slices/wishlistSlice";
import ProductCard from "@/src/components/common/ProductCard";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function WishlistPage() {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const products = useAppSelector((state) => state.products.items);

  // Recommendations for the "Just For You" section (random products not in wishlist)
  const recommendations = products
    .filter((p) => !wishlistItems.some((item) => item.id === p.id))
    .slice(0, 4);

  const handleMoveAllToBag = () => {
    if (wishlistItems.length === 0) {
      toast.error("Your wishlist is empty!");
      return;
    }
    
    wishlistItems.forEach((product) => {
      dispatch(
        addToCart({
          product,
          quantity: 1,
          size: product.sizes?.[0] || "M",
          color: product.colors?.[0] || "",
        })
      );
    });

    dispatch(clearWishlist());
    toast.success("Moved all wishlist items to bag!");
  };

  return (
    <div className="container mx-auto px-6 py-10 max-w-[1170px] text-black">
      {/* Wishlist Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-medium">
          Wishlist ({wishlistItems.length})
        </h1>
        {wishlistItems.length > 0 && (
          <button
            onClick={handleMoveAllToBag}
            className="px-6 py-3 rounded border border-gray-300 font-semibold hover:border-black hover:bg-gray-50 transition text-sm cursor-pointer"
          >
            Move All To Bag
          </button>
        )}
      </div>

      {/* Wishlist Grid */}
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlistItems.map((product) => (
            <div key={product.id} className="flex justify-center">
              <ProductCard
                product={product}
                showTrash={true}
                onTrashClick={() => {
                  dispatch(removeFromWishlist(product.id));
                  toast.info(`Removed ${product.title} from wishlist.`);
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-gray-200 rounded p-8">
          <div className="w-12 h-12 bg-bg-secondary rounded-full flex items-center justify-center text-gray-400 mb-4">
            <Heart size={22} />
          </div>
          <h3 className="font-bold text-lg mb-1">Your wishlist is empty</h3>
          <p className="text-gray-500 text-sm mb-5">Save your favorite items here to track them easily.</p>
          <Link href="/products" className="btn-primary px-6 py-2.5 text-sm inline-flex items-center gap-2">
            Explore products <ArrowRight size={15} />
          </Link>
        </div>
      )}

      {/* Recommended "Just For You" Section */}
      <div className="mt-20 border-t border-gray-200 pt-16">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <div className="h-10 w-5 rounded bg-primary" />
            <h2 className="text-xl font-bold text-black">Just For You</h2>
          </div>
          <Link
            href="/products"
            className="px-6 py-3 rounded border border-gray-300 font-semibold hover:border-black hover:bg-gray-50 transition text-sm text-black inline-flex"
          >
            See All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {recommendations.map((product) => (
            <div key={product.id} className="flex justify-center">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
