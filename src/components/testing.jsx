import React, { useEffect, useRef, useState } from "react";
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";

export default function TestVanta() {
  const ref = useRef(null);
  const [effect, setEffect] = useState(null);

  useEffect(() => {
    if (!effect) {
      setEffect(
        NET({
          el: ref.current,
          THREE,
          backgroundAlpha: 0,
          points: 10,
          maxDistance: 20,
          spacing: 15,
        })
      );
    }
    return () => {
      if (effect) effect.destroy();
    };
  }, [effect]);

  return <div ref={ref} style={{ height: "100vh", width: "100vw" }} />;
}
