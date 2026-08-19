"use client";

import { use, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { addToCart } from "@/src/store/slices/cartSlice";
import { toggleWishlist } from "@/src/store/slices/wishlistSlice";
import ProductCarousel from "@/src/components/products/ProductCarousel";
import ProductCard from "@/src/components/common/ProductCard";
import { Star, Heart, RefreshCw, Truck } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id);

  // Redux selection
  const products = useAppSelector((state) => state.products.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  
  const product = products.find((p) => p.id === productId);

  // Local state for configuration
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [quantity, setQuantity] = useState<number>(1);

  // Initialize defaults
  useEffect(() => {
    if (product) {
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-20 text-center max-w-[1170px]">
        <h2 className="text-2xl font-semibold text-black">Product Not Found</h2>
        <p className="text-gray-500 mt-2">The product you are trying to view does not exist.</p>
        <Link href="/products" className="btn-primary mt-6 px-6 py-2.5 inline-flex">
          Back to Products
        </Link>
      </div>
    );
  }

  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const productTitle = product.name || (product as any).title || "Product";

  const handleWishlistToggle = () => {
    dispatch(toggleWishlist(product));
    if (isInWishlist) {
      toast.info(`Removed ${productTitle} from wishlist.`);
    } else {
      toast.success(`Added ${productTitle} to wishlist!`);
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        quantity,
        size: selectedSize,
        color: selectedColor,
      })
    );
    toast.success(`Added ${quantity} ${productTitle} to cart!`);
  };

  const handleBuyNow = () => {
    dispatch(
      addToCart({
        product,
        quantity,
        size: selectedSize,
        color: selectedColor,
      })
    );
    router.push("/checkout");
  };

  const incrementQty = () => setQuantity((q) => q + 1);
  const decrementQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  // Get related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-6 py-10 max-w-[1170px] text-black">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-10 flex gap-2">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:underline">Products</Link>
        <span>/</span>
        <span className="font-semibold text-black truncate max-w-[200px]">
          {productTitle}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Side: Images View */}
        <div className="lg:col-span-7">
          <ProductCarousel
            images={product.images || [product.image]}
            title={productTitle}
          />
        </div>

        {/* Right Side: Product Configuration */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{productTitle}</h1>
            
            {/* Reviews / Rating */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < product.rating ? "fill-current" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.reviewCount} Reviews)</span>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-green-500 font-medium">In Stock</span>
            </div>

            {/* Price */}
            <p className="text-2xl font-semibold mt-4">${product.salePrice.toFixed(2)}</p>
          </div>

          <hr className="border-gray-200" />

          {/* Short Description */}
          <p className="text-sm text-gray-600 leading-relaxed">
            {product.description || "No description available for this item."}
          </p>

          <hr className="border-gray-200" />

          {/* Colors Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-4">
              <span className="text-base font-semibold">Colours:</span>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    style={{ backgroundColor: c }}
                    className={`
                      w-6
                      h-6
                      rounded-full
                      border-2
                      transition
                      cursor-pointer
                      ${selectedColor === c ? "border-black scale-110" : "border-transparent hover:border-gray-300"}
                    `}
                    title={c}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex items-center gap-4 mt-2">
              <span className="text-base font-semibold">Size:</span>
              <div className="flex gap-2.5">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`
                      w-8
                      h-8
                      text-sm
                      font-semibold
                      rounded
                      border
                      flex
                      items-center
                      justify-center
                      transition
                      cursor-pointer
                      ${
                        selectedSize === s
                          ? "bg-primary text-white border-primary"
                          : "border-gray-300 text-black hover:border-black"
                      }
                    `}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector & Action Buttons */}
          <div className="flex items-center gap-4 mt-4">
            {/* Quantity Controls */}
            <div className="flex items-center border border-gray-300 rounded overflow-hidden h-[44px]">
              <button
                onClick={decrementQty}
                className="w-10 h-full flex items-center justify-center border-r border-gray-300 hover:bg-gray-100 font-bold cursor-pointer"
              >
                -
              </button>
              <span className="w-12 h-full flex items-center justify-center font-semibold text-black text-sm">
                {quantity}
              </span>
              <button
                onClick={incrementQty}
                className="w-10 h-full flex items-center justify-center border-l border-gray-300 hover:bg-gray-100 font-bold cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Add/Buy Buttons */}
            <button
              onClick={handleAddToCart}
              className="btn-primary flex-1 h-[44px] text-sm"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="btn-primary bg-black hover:bg-gray-800 flex-1 h-[44px] text-sm"
            >
              Buy Now
            </button>

            {/* Wishlist Toggle Heart Button */}
            <button
              onClick={handleWishlistToggle}
              className={`
                w-[44px]
                h-[44px]
                border
                border-gray-300
                rounded
                flex
                items-center
                justify-center
                hover:border-black
                transition
                cursor-pointer
                ${isInWishlist ? "bg-red-50 border-red-200" : "bg-white"}
              `}
            >
              <Heart
                size={18}
                className={isInWishlist ? "fill-primary text-primary" : "text-black"}
              />
            </button>
          </div>

          {/* Delivery & Return Info panels */}
          <div className="border border-gray-300 rounded overflow-hidden mt-6 text-sm text-black">
            <div className="flex gap-4 p-4 border-b border-gray-300">
              <Truck size={24} className="text-black flex-shrink-0" />
              <div>
                <h4 className="font-semibold">Free Delivery</h4>
                <p className="text-xs text-gray-500 mt-0.5 underline cursor-pointer">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-4">
              <RefreshCw size={24} className="text-black flex-shrink-0" />
              <div>
                <h4 className="font-semibold">Return Delivery</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Free 30 Days Delivery Returns.{" "}
                  <span className="underline cursor-pointer">Details</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Items Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 border-t border-gray-200 pt-16">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-10 w-5 rounded bg-primary" />
            <h2 className="text-xl font-bold text-black">Related Items</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <div key={p.id} className="flex justify-center">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
