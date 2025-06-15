//src/app/page.tsx
'use client'
import Hero from "@/components/Hero";
import { useEffect, useState } from "react";


type Blob = {
  width: number;
  height: number;
  top: number;
  left: number;
};
export default function Home() {
  const [blobs, setBlobs] = useState<Blob[]>([]);
  useEffect(() => {
    const newBlobs: Blob[] = Array.from({ length: 40 }, () => ({
      width: Math.random() * 200 + 100,
      height: Math.random() * 200 + 100,
      top: Math.random() * 100,
      left: Math.random() * 100,
    }));
    setBlobs(newBlobs);
  }, []);

  return (
    <div className=" ">
      
      <Hero />
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {blobs.map((blob, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-teal-500/15"
            style={{
              width: `${blob.width}px`,
              height: `${blob.height}px`,
              top: `${blob.top}%`,
              left: `${blob.left}%`,
              filter: 'blur(60px)',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
