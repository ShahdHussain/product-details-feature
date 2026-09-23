"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Product } from "@/features/products/types/product.types";
import { formatPrice } from "@/features/products/utils/product.utils";

type ProductDetailsProps = {
  product: Product;
};

const defaultBottleSizes = [
  { value: "30 ml", label: "30 ml" },
  { value: "50 ml", label: "50 ml" },
  { value: "100 ml", label: "100 ml" },
];

const defaultGiftWrappings = [
  { value: "No wrap", label: "No wrap" },
  { value: "Signature wrap", label: "Signature wrap (+$18)" },
  { value: "Luxury wrap", label: "Luxury wrap (+$28)" },
];

/** US-04: product information. */
export function ProductDetails({ product }: ProductDetailsProps) {
  const image = product.images[0] ?? "/images/products/fleur-de-lune.png";

  const productOptions = product.options ?? [];
  const bottleSizes = useMemo(() => {
    const sizeOption = productOptions.find((option) =>
      /size|bottle|volume/i.test(option.name),
    );

    if (sizeOption && sizeOption.values.length > 0) {
      return sizeOption.values.map((value) => ({ value, label: value }));
    }

    return defaultBottleSizes;
  }, [productOptions]);

  const giftWrappingOptions = useMemo(() => {
    const wrapOption = productOptions.find((option) =>
      /gift|wrap/i.test(option.name),
    );

    if (wrapOption && wrapOption.values.length > 0) {
      return wrapOption.values.map((value) => ({ value, label: value }));
    }

    return defaultGiftWrappings;
  }, [productOptions]);

  const [selectedSize, setSelectedSize] = useState(bottleSizes[1]?.value ?? "50 ml");
  const [selectedGiftWrap, setSelectedGiftWrap] = useState(
    giftWrappingOptions[0]?.value ?? "No wrap",
  );

  const notes = product.notes ? product.notes.split("/").map((item) => item.trim()) : [];

  return (
    <section className="w-full rounded-[24px] border border-[#e8e0d4] bg-[#fcfaf7] p-4 text-[#1d1b1a] shadow-[0_14px_38px_rgba(26,22,18,0.06)] sm:rounded-[28px] sm:p-6 lg:p-8">
      <div className="grid gap-5 sm:gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-8">
        <div className="overflow-hidden rounded-[20px] border border-[#e7dfd5] bg-[#f2eee9] sm:rounded-[24px]">
          <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[3/4] lg:aspect-[4/5]">
            <Image
              src={image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 42vw, (min-width: 640px) 60vw, 100vw"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a38b68] sm:text-[11px]">
            {product.category}
          </p>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div>
              <h1 className="font-[family-name:var(--font-instrument-serif)] text-[2.3rem] leading-none text-[#1d1b1a] sm:text-[2.6rem] lg:text-[3rem]">
                {product.name}
              </h1>
            </div>
            <p className="text-lg font-semibold text-[#1d1b1a] sm:pt-2 sm:text-xl lg:text-[1.35rem]">
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#5c524d] sm:gap-3 sm:text-[11px]">
            <span className="rounded-full border border-[#dac7a4] bg-[#f5efe8] px-2.5 py-1.5">
              {selectedSize}
            </span>
            <span className="rounded-full border border-[#dfe4d9] bg-[#f3f7f3] px-2.5 py-1.5 text-[#2b6a4d]">
              In stock
            </span>
          </div>

          <p className="mt-5 text-[14px] leading-7 text-[#4c4845] sm:mt-6 sm:text-[15px]">
            {product.description}
          </p>

          <div className="mt-6 border-t border-[#eadfce] pt-5 sm:mt-7">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8b7660] sm:text-[11px]">
                Ingredients / notes
              </h2>
              <span className="text-[10px] uppercase tracking-[0.14em] text-[#7f7068] sm:text-xs">
                {product.scentFamily}
              </span>
            </div>

            <ul className="mt-3 space-y-2 text-sm leading-6 text-[#2d2824]">
              {notes.length > 0 ? (
                notes.map((note) => (
                  <li key={note} className="flex items-start gap-2">
                    <span className="mt-2 inline-block size-1.5 rounded-full bg-[#c7a36f]" />
                    <span>{note}</span>
                  </li>
                ))
              ) : (
                <li className="flex items-start gap-2">
                  <span className="mt-2 inline-block size-1.5 rounded-full bg-[#c7a36f]" />
                  <span>{product.description}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-7 grid gap-5 border-t border-[#eadfce] pt-5 sm:mt-8 sm:gap-6 sm:pt-6 md:grid-cols-2">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8b7660] sm:text-[11px]">
            Bottle size
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {bottleSizes.map((option) => {
              const isActive = selectedSize === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelectedSize(option.value)}
                  className={[
                    "rounded-full border px-3 py-2 text-xs font-medium transition-colors sm:px-4 sm:text-sm",
                    isActive
                      ? "border-[#b99564] bg-[#efe0c1] text-[#1d1b1a]"
                      : "border-[#e1d7c9] bg-white text-[#443d39] hover:border-[#b99564]",
                  ].join(" ")}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8b7660] sm:text-[11px]">
            Gift wrapping
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {giftWrappingOptions.map((option) => {
              const isActive = selectedGiftWrap === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelectedGiftWrap(option.value)}
                  className={[
                    "rounded-full border px-3 py-2 text-xs font-medium transition-colors sm:px-4 sm:text-sm",
                    isActive
                      ? "border-[#b99564] bg-[#efe0c1] text-[#1d1b1a]"
                      : "border-[#e1d7c9] bg-white text-[#443d39] hover:border-[#b99564]",
                  ].join(" ")}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
