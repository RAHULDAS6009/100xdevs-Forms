import { useEffect, useRef, useState } from "react";

export function TypeWriterEffect({ val }: { val: string }) {
  const inputRef = useRef(0);
  const [arr1, setArr1] = useState<any>([]);

  function timeout() {}

  useEffect(() => {
    timeout();
  }, []);

  return (
    <div className="flex bg-amber-200">
      {arr1.map((item: string, index: number) => {
        return <div key={index}>{item}</div>;
      })}
    </div>
  );
}
