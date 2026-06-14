"use client";

import Image from "next/image";

interface Option {
  key: string;
  name: string;
  image: string;
  price: number;
}

interface ConfigPanelProps {
  title: string;
  options: Option[];
  selected: string;
  onSelect: (key: string) => void;
}

export default function ConfigPanel({
  title,
  options,
  selected,
  onSelect,
}: ConfigPanelProps) {
  return (
    <div className="border-b border-[#d4af37] border-opacity-20 pb-8">
      <h3 className="text-xl font-bold text-[#f5f1e8] mb-6 tracking-wide">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={option.key}
            onClick={() => onSelect(option.key)}
            className={`group relative p-4 rounded-sm border transition-all duration-300 ${
              selected === option.key
                ? "border-[#d4af37] bg-gradient-to-br from-[#d4af37] to-[#d4af37] bg-opacity-15 shadow-lg shadow-[#d4af37]/20"
                : "border-[#d4af37] border-opacity-25 hover:border-opacity-40 hover:shadow-md hover:shadow-[#d4af37]/10"
            }`}
          >
            <div className="relative h-24 mb-3 overflow-hidden rounded-sm bg-[#0a1428] bg-opacity-50">
              <Image
                src={option.image}
                alt={option.name}
                fill
                style={{
                  objectFit: "contain",
                }}
                className="group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-sm font-semibold text-[#f5f1e8] truncate leading-tight">
              {option.name}
            </p>
            <p className={`text-xs font-mono mt-1 transition-colors ${
              selected === option.key ? "text-[#d4af37]" : "text-[#d4af37] opacity-75"
            }`}>
              +${option.price}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
