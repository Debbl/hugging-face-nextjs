import Image from "next/image";
import { useEffect, useRef, useState } from "react";

async function getImage(inputs: string) {
  const response = await fetch("/api/gen", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs,
    }),
  });
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  return url;
}

export default function Home() {
  const [img, setImg] = useState("");
  const [input, setInput] = useState("");
  const [isGening, setIsGening] = useState(false);

  async function handleClick() {
    setIsGening(true);
    const imgURL = await getImage(input);
    setImg(imgURL);
    setIsGening(true);
  }

  useEffect(() => {}, []);

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => handleClick()} disabled={isGening}>
        ok
      </button>
      <div>
        {img && <Image src={img} alt="" unoptimized width={300} height={300} />}
      </div>
    </div>
  );
}
