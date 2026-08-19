"use client";

import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { clearCart } from "@/src/store/slices/cartSlice";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CreditCard, ShoppingBag } from "lucide-react";

interface CheckoutFormInput {
  firstName: string;
  companyName?: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  phone: string;
  email: string;
  saveInfo: boolean;
}

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.cart.items);

  const [paymentMethod, setPaymentMethod] = useState<"bank" | "cod">("cod");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormInput>({
    defaultValues: {
      saveInfo: false,
    },
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.salePrice * item.quantity,
    0
  );

  const total = subtotal - discount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }
    if (couponCode.toUpperCase() === "SAVE10") {
      setDiscount(Math.round(subtotal * 0.1));
      toast.success("Coupon code SAVE10 applied! 10% discount applied.");
    } else {
      toast.error("Invalid coupon code. Try 'SAVE10'");
    }
  };

  const onSubmit = (data: CheckoutFormInput) => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Add products before placing an order.");
      return;
    }

    // Place order simulation
    toast.success("Order placed successfully! Thank you for shopping with us.");
    dispatch(clearCart());
    router.push("/");
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-6 py-20 text-center max-w-[1170px] text-black">
        <div className="w-16 h-16 bg-bg-secondary rounded-full flex items-center justify-center text-gray-400 mb-6 mx-auto">
          <ShoppingBag size={28} />
        </div>
        <h2 className="text-xl font-bold mb-2">No Items for Checkout</h2>
        <p className="text-gray-500 mb-6">Your cart is currently empty. Go back to shopping to add items.</p>
        <Link href="/products" className="btn-primary px-8 py-3 inline-flex">
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10 max-w-[1170px] text-black">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-10 flex gap-2">
        <span>Account</span>
        <span>/</span>
        <span>My Account</span>
        <span>/</span>
        <span>Product</span>
        <span>/</span>
        <Link href="/cart" className="hover:underline">View Cart</Link>
        <span>/</span>
        <span className="font-semibold text-black">Checkout</span>
      </div>

      <h1 className="text-3xl font-semibold mb-10">Billing Details</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Side: Form Fields */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* First Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-gray-500">First Name*</label>
            <input
              type="text"
              {...register("firstName", { required: "First Name is required" })}
              className="input-primary bg-bg-secondary !h-[50px] text-sm"
            />
            {errors.firstName && (
              <span className="text-xs text-red-500 mt-0.5">{errors.firstName.message}</span>
            )}
          </div>

          {/* Company Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-gray-500">Company Name</label>
            <input
              type="text"
              {...register("companyName")}
              className="input-primary bg-bg-secondary !h-[50px] text-sm"
            />
          </div>

          {/* Street Address */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-gray-500">Street Address*</label>
            <input
              type="text"
              {...register("streetAddress", { required: "Street Address is required" })}
              className="input-primary bg-bg-secondary !h-[50px] text-sm"
              placeholder="House number and street name"
            />
            {errors.streetAddress && (
              <span className="text-xs text-red-500 mt-0.5">{errors.streetAddress.message}</span>
            )}
          </div>

          {/* Apartment */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-gray-500">Apartment, floor, etc. (optional)</label>
            <input
              type="text"
              {...register("apartment")}
              className="input-primary bg-bg-secondary !h-[50px] text-sm"
            />
          </div>

          {/* City */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-gray-500">Town/City*</label>
            <input
              type="text"
              {...register("city", { required: "City is required" })}
              className="input-primary bg-bg-secondary !h-[50px] text-sm"
            />
            {errors.city && (
              <span className="text-xs text-red-500 mt-0.5">{errors.city.message}</span>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-gray-500">Phone Number*</label>
            <input
              type="tel"
              {...register("phone", { required: "Phone number is required" })}
              className="input-primary bg-bg-secondary !h-[50px] text-sm"
            />
            {errors.phone && (
              <span className="text-xs text-red-500 mt-0.5">{errors.phone.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-gray-500">Email Address*</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter valid email" },
              })}
              className="input-primary bg-bg-secondary !h-[50px] text-sm"
            />
            {errors.email && (
              <span className="text-xs text-red-500 mt-0.5">{errors.email.message}</span>
            )}
          </div>

          {/* Save Info Checkbox */}
          <div className="flex items-center gap-3.5 mt-2">
            <input
              type="checkbox"
              id="saveInfo"
              {...register("saveInfo")}
              className="w-5 h-5 accent-primary cursor-pointer rounded"
            />
            <label htmlFor="saveInfo" className="text-sm text-black cursor-pointer font-medium">
              Save this information for faster check-out next time
            </label>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Order Items list */}
          <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto hide-scrollbar pr-2">
            {cartItems.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                className="flex items-center justify-between text-sm py-2"
              >
                <div className="flex items-center gap-3.5">
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
                    <span className="font-semibold text-black truncate max-w-[180px] block">
                      {item.product.title}
                    </span>
                    <span className="text-xs text-gray-500">
                      Qty: {item.quantity} | Size: {item.selectedSize}
                    </span>
                  </div>
                </div>
                <span className="font-semibold">${(item.product.salePrice * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Price Calculations */}
          <div className="flex flex-col gap-3.5 border-b border-gray-200 pb-5">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-semibold">${subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between items-center text-sm text-green-600">
                <span>Discount:</span>
                <span className="font-semibold">-${discount}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Shipping:</span>
              <span className="font-semibold text-green-600">Free</span>
            </div>
            <div className="flex justify-between items-center text-base font-bold">
              <span>Total:</span>
              <span>${total}</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="flex flex-col gap-4">
            {/* Bank Transfer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="bank"
                  name="payment"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                  className="w-5 h-5 accent-primary cursor-pointer"
                />
                <label htmlFor="bank" className="text-sm font-semibold cursor-pointer">
                  Bank
                </label>
              </div>
              <div className="flex gap-2">
                {/* Credit Card icons */}
                <div className="w-8 h-5 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-[8px] font-bold text-blue-800">
                  VISA
                </div>
                <div className="w-8 h-5 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-[8px] font-bold text-red-600">
                  MC
                </div>
              </div>
            </div>

            {/* Cash on Delivery */}
            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="cod"
                name="payment"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
                className="w-5 h-5 accent-primary cursor-pointer"
              />
              <label htmlFor="cod" className="text-sm font-semibold cursor-pointer">
                Cash on delivery
              </label>
            </div>
          </div>

          {/* Checkout Coupon Code Form */}
          <div className="flex gap-4 items-center">
            <input
              type="text"
              placeholder="Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="input-primary flex-1 border border-gray-300 !bg-transparent text-sm h-[50px]"
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              className="btn-primary px-6 h-[50px] text-sm"
            >
              Apply Coupon
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full py-4 text-center mt-2"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}
