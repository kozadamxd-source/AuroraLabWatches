"use client";

import Image from "next/image";

interface WatchPreviewProps {
  caseImage: string;
  dialImage: string;
  braceletImage: string;
}

export default function WatchPreview({ caseImage, dialImage, braceletImage }: WatchPreviewProps) {
  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto select-none">
      {/* Bracelet — bottom layer */}
      <div className="absolute inset-0">
        <Image
          src={braceletImage}
          alt="Bracelet"
          fill
          priority
          sizes="(max-width: 768px) 90vw, 50vw"
          style={{ objectFit: "contain", filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.18))" }}
        />
      </div>

      {/* Case — middle layer */}
      <div className="absolute inset-0 z-10">
        <Image
          src={caseImage}
          alt="Case"
          fill
          priority
          sizes="(max-width: 768px) 90vw, 50vw"
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Dial — top layer */}
      <div className="absolute inset-0 z-20">
        <Image
          src={dialImage}
          alt="Dial"
          fill
          priority
          sizes="(max-width: 768px) 90vw, 50vw"
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
}
