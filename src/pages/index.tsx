import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRequest } from "ahooks";

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
  const URL = window.URL.createObjectURL(blob);
  return URL;
}

export default function Home() {
  const [input, setInput] = useState("");
  const { data, loading, run } = useRequest(() => getImage(input), {
    manual: true,
  });

  function handleClick() {
    run();
  }

  return (
    <div>
      <div className="mx-auto mt-12 w-80">
        <div className="flex flex-col items-center gap-y-6">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-80 border px-3 py-1"
            placeholder="请输入 Prompt"
          />
          <button
            className={`w-40 rounded border px-8 py-1 shadow ${
              loading
                ? "animate-pulse bg-gray-300 text-gray-400"
                : "bg-green-300"
            }`}
            onClick={() => handleClick()}
            disabled={loading}
          >
            生成
          </button>
        </div>
        <div className="relative mt-10 h-80 w-80">
          {loading && (
            <div className="h-80 w-80 animate-pulse bg-gray-200"></div>
          )}
          {data && !loading && <Image src={data} alt="" unoptimized fill />}
        </div>
      </div>
    </div>
  );
}
