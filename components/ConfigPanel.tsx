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
    <div className="border-b border-gray-200 pb-8">
      <h3 className="text-lg font-semibold text-black mb-4">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <button
            key={option.key}
            onClick={() => onSelect(option.key)}
            className={`group relative p-3 border rounded transition-all ${
              selected === option.key
                ? "border-black bg-gray-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="relative h-20 mb-2 overflow-hidden rounded bg-gray-100">
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
            <p className="text-xs text-gray-600 mt-1">
              +${option.price}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
