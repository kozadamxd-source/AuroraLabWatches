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
    <div className="border-b border-[#c0c0c0] border-opacity-20 py-6">
      <h3 className="text-lg font-bold text-[#d4af37] mb-4 tracking-wide">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {options.map((option) => (
          <button
            key={option.key}
            onClick={() => onSelect(option.key)}
            className={`relative p-3 rounded border transition-all duration-200 ${
              selected === option.key
                ? "border-[#d4af37] bg-[#d4af37] bg-opacity-10"
                : "border-[#c0c0c0] border-opacity-30 hover:border-opacity-50"
            }`}
          >
            <div className="relative h-20 mb-2">
              <Image
                src={option.image}
                alt={option.name}
                fill
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
            <p className="text-xs sm:text-sm font-medium truncate">
              {option.name}
            </p>
            <p className="text-xs text-[#d4af37] font-mono">+${option.price}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
