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
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-black uppercase tracking-wide">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <button
            key={option.key}
            onClick={() => onSelect(option.key)}
            className={`p-3 border text-left transition-all ${
              selected === option.key
                ? "border-black bg-gray-50"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <div className="relative h-16 mb-2 overflow-hidden bg-gray-100">
              <Image
                src={option.image}
                alt={option.name}
                fill
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
            <p className="text-xs font-medium text-black truncate">
              {option.name}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              +${option.price}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
