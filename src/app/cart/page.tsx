"use client";

import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { removeFromCart, updateQuantity } from "@/src/store/slices/cartSlice";
import Link from "next/link";
import Image from "next/image";
import { Trash2, X, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.salePrice * item.quantity,
    0
  );

  const total = subtotal - discount;

  const handleQtyChange = (
    id: number,
    size: string,
    color: string,
    val: number
  ) => {
    if (val < 1) return;
    dispatch(updateQuantity({ id, size, color, quantity: val }));
  };

  const handleRemove = (id: number, size: string, color: string, title: string) => {
    dispatch(removeFromCart({ id, size, color }));
    toast.info(`Removed ${title} (${size}) from cart.`);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }
    // simple mock coupon
    if (couponCode.toUpperCase() === "SAVE10") {
      setDiscount(Math.round(subtotal * 0.1));
      toast.success("Coupon code SAVE10 applied! 10% discount applied.");
    } else {
      toast.error("Invalid coupon code. Try 'SAVE10'");
    }
  };

  return (
    <div className="container mx-auto px-6 py-10 max-w-[1170px] text-black">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-10 flex gap-2">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <span className="font-semibold text-black">Cart</span>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-bg-secondary rounded-full flex items-center justify-center text-gray-400 mb-6">
            <ShoppingBag size={28} />
          </div>
          <h2 className="text-xl font-bold mb-2">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-6">Add some products to your cart to see them here.</p>
          <Link href="/products" className="btn-primary px-8 py-3">
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {/* Cart Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-200 text-sm font-medium text-gray-500 pb-4">
                  <th className="py-4 pl-4">Product</th>
                  <th className="py-4">Price</th>
                  <th className="py-4">Quantity</th>
                  <th className="py-4 text-right pr-4">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => {
                  const itemKey = `${item.product.id}-${item.selectedSize}-${item.selectedColor}`;
                  const rowSubtotal = item.product.salePrice * item.quantity;
                  return (
                    <tr
                      key={itemKey}
                      className="border-b border-gray-100 hover:bg-gray-50 transition group"
                    >
                      {/* Product details */}
                      <td className="py-6 pl-4 flex items-center gap-4">
                        <button
                          onClick={() =>
                            handleRemove(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor,
                              item.product.title
                            )
                          }
                          className="text-gray-400 hover:text-red-500 transition cursor-pointer"
                          title="Remove item"
                        >
                          <X size={16} />
                        </button>
                        <div className="relative w-12 h-12 bg-bg-secondary rounded p-1 flex-shrink-0 flex items-center justify-center">
                          <Image
                            fill
                            src={
                              item.product.image && typeof item.product.image === "string" && item.product.image.trim() !== ""
                                ? item.product.image
                                : Array.isArray(item.product.images) && typeof item.product.images[0] === "string" && item.product.images[0].trim() !== ""
                                ? item.product.images[0]
                                : (item.product.images?.[0] as any)?.image && typeof (item.product.images[0] as any).image === "string" && (item.product.images[0] as any).image.trim() !== ""
                                ? (item.product.images[0] as any).image
                                : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23ccc' stroke-width='2'%3E%3Crect width='18' height='18' x='3' y='3' rx='2' ry='2'/%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/%3E%3C/svg%3E"
                            }
                            alt={item.product.title || item.product.name || "Product image"}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/products/${item.product.id}`}
                            className="font-medium hover:underline text-sm block"
                          >
                            {item.product.title}
                          </Link>
                          <div className="flex gap-2 text-xs text-gray-500 mt-1">
                            <span>Size: {item.selectedSize}</span>
                            {item.selectedColor && (
                              <div className="flex items-center gap-1">
                                <span>Color:</span>
                                <span
                                  style={{ backgroundColor: item.selectedColor }}
                                  className="w-2.5 h-2.5 rounded-full inline-block border border-gray-300"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Unit Price */}
                      <td className="py-6 font-medium text-sm">
                        ${item.product.salePrice}
                      </td>

                      {/* Quantity selector */}
                      <td className="py-6">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQtyChange(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor,
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="w-16 h-10 px-2 rounded border border-gray-300 text-center text-sm focus:outline-none focus:border-primary text-black bg-transparent"
                        />
                      </td>

                      {/* Subtotal */}
                      <td className="py-6 font-semibold text-right pr-4 text-sm">
                        ${rowSubtotal}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Action Buttons below table */}
          <div className="flex justify-between items-center flex-wrap gap-4 mt-2">
            <Link
              href="/products"
              className="px-8 py-3 rounded border border-gray-300 font-medium hover:border-black hover:bg-gray-50 transition text-sm text-black flex items-center justify-center"
            >
              Return To Shop
            </Link>

            <button
              onClick={() => toast.success("Cart updated successfully!")}
              className="px-8 py-3 rounded border border-gray-300 font-medium hover:border-black hover:bg-gray-50 transition text-sm text-black cursor-pointer"
            >
              Update Cart
            </button>
          </div>

          {/* Checkout & Coupon details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6 items-start">
            {/* Coupon field */}
            <form
              onSubmit={handleApplyCoupon}
              className="lg:col-span-6 flex gap-4 w-full"
            >
              <input
                type="text"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="input-primary flex-1 max-w-[300px] h-[50px] border border-gray-300 !bg-transparent text-sm"
              />
              <button
                type="submit"
                className="btn-primary px-8 h-[50px] text-sm"
              >
                Apply Coupon
              </button>
            </form>

            {/* Total card */}
            <div className="lg:col-span-6 lg:col-start-8 border border-black rounded p-6 bg-white w-full">
              <h3 className="text-lg font-bold mb-6">Cart Total</h3>

              <div className="flex justify-between items-center text-sm mb-4 border-b border-gray-200 pb-3">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">${subtotal}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between items-center text-sm mb-4 border-b border-gray-200 pb-3 text-green-600">
                  <span>Discount:</span>
                  <span className="font-semibold">-${discount}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-sm mb-4 border-b border-gray-200 pb-3">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>

              <div className="flex justify-between items-center text-base mb-6 font-bold">
                <span>Total:</span>
                <span>${total}</span>
              </div>

              <Link
                href="/checkout"
                className="btn-primary w-full py-4 text-center text-sm"
              >
                Proceed to checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
