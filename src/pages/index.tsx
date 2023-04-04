import Image from "next/image";
import { useState } from "react";
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
  const [args, setArgs] = useState({
    "Positive prompt": "",
    "Negative prompt": "",
    Steps: 0,
  });
  const { data, loading, run } = useRequest(
    () => {
      let inputs = `${args["Positive prompt"]}, `;

      for (const k in args) {
        if (k === "Positive prompt") continue;
        const v = args[k as keyof typeof args];
        if (v) inputs += `${k}:${v}, `;
      }

      return getImage(inputs);
    },
    {
      manual: true,
    }
  );

  function handleClick() {
    run();
  }

  return (
    <div>
      <h3 className="py-2 text-center">
        https://huggingface.co/gsdf/Counterfeit-V2.5
      </h3>
      <div className="mx-auto mt-12 w-80">
        <div className="flex flex-col gap-y-6">
          <label>
            <span>Positive Prompt:</span>
            <textarea
              value={args["Positive prompt"]}
              onChange={(e) =>
                setArgs({
                  ...args,
                  "Positive prompt": e.target.value,
                })
              }
              className="w-full border px-3 py-1"
              placeholder="请输入 Prompt"
            />
          </label>
          <label>
            <span>Negative Prompt:</span>
            <textarea
              value={args["Negative prompt"]}
              onChange={(e) =>
                setArgs({
                  ...args,
                  "Negative prompt": e.target.value,
                })
              }
              className="w-full border px-3 py-1"
              placeholder="请输入 Negative Prompt"
            />
          </label>
          <label className="flex items-center gap-x-1">
            <span>Steps:</span>
            <input
              type="range"
              value={args.Steps}
              onChange={(e) =>
                setArgs({
                  ...args,
                  Steps: +e.target.value,
                })
              }
              min="-1"
              max="150"
              step="1"
              className="w-60"
              placeholder="请输入 Prompt"
            />
            <span>{args.Steps}</span>
          </label>
          <button
            className={`w-40 self-center rounded border px-8 py-1 shadow ${
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
