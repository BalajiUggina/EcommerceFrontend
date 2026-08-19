"use client";

import { Truck, ShieldCheck, Headphones } from "lucide-react";

export default function FeatureBlocks() {
  const features = [
    {
      icon: <Truck size={32} className="text-black" />,
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
    },
    {
      icon: <Headphones size={32} className="text-black" />,
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
    },
    {
      icon: <ShieldCheck size={32} className="text-black" />,
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days",
    },
  ];

  return (
    <section className="py-20 flex flex-col md:flex-row justify-center items-center gap-16 text-black max-w-[1170px] mx-auto">
      {features.map((feat, idx) => (
        <div key={idx} className="flex flex-col items-center text-center gap-4 max-w-[260px]">
          {/* Icon Circle Container */}
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center border-8 border-gray-100">
            {feat.icon}
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-wide mb-1 uppercase">
              {feat.title}
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              {feat.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
