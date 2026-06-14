"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface WatchPreviewProps {
  caseImage: string;
  dialImage: string;
  braceletImage: string;
}

export default function WatchPreview({
  caseImage,
  dialImage,
  braceletImage,
}: WatchPreviewProps) {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true);
  }, [caseImage, dialImage, braceletImage]);

  return (
    <div
      className={`relative w-full max-w-sm h-96 mx-auto transition-opacity duration-300 ${
        fade ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Bracelet - bottom layer */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={braceletImage}
            alt="Bracelet"
            width={400}
            height={400}
            priority
            style={{
              objectFit: "contain",
              filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))",
            }}
          />
        </div>

        {/* Case - middle layer */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Image
            src={caseImage}
            alt="Case"
            width={400}
            height={400}
            priority
            style={{
              objectFit: "contain",
            }}
          />
        </div>

        {/* Dial - top layer */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <Image
            src={dialImage}
            alt="Dial"
            width={400}
            height={400}
            priority
            style={{
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </div>
  );
}
