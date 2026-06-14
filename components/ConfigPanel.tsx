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

export default function ConfigPanel({ title, options, selected, onSelect }: ConfigPanelProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h3 className="text-xs font-semibold text-black uppercase tracking-widest">{title}</h3>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {options.map((option) => {
          const isSelected = selected === option.key;
          return (
            <button
              key={option.key}
              onClick={() => onSelect(option.key)}
              className={`group flex flex-col items-center p-3 border transition-all duration-150 ${
                isSelected
                  ? "border-black"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <div className="relative w-full aspect-square mb-2 bg-gray-50">
                <Image
                  src={option.image}
                  alt={option.name}
                  fill
                  sizes="120px"
                  style={{ objectFit: "contain", padding: "8px" }}
                />
              </div>
              <p className="text-[11px] font-medium text-black text-center leading-tight truncate w-full">
                {option.name}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">+${option.price}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
