import React, { useEffect, useRef } from "react";

const clamp01 = (value) => Math.min(1, Math.max(0, value));

const smoothstep = (edge0, edge1, x) => {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

const createNoiseLut = (size) => {
  const lut = new Float32Array(size * size);
  for (let i = 0; i < lut.length; i += 1) {
    lut[i] = Math.random();
  }
  return lut;
};

const sampleNoise = (lut, size, x, y) => {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const tx = x - xi;
  const ty = y - yi;

  const wrap = (v) => ((v % size) + size) % size;

  const x0 = wrap(xi);
  const x1 = wrap(xi + 1);
  const y0 = wrap(yi);
  const y1 = wrap(yi + 1);

  const v00 = lut[y0 * size + x0];
  const v10 = lut[y0 * size + x1];
  const v01 = lut[y1 * size + x0];
  const v11 = lut[y1 * size + x1];

  const a = v00 + (v10 - v00) * tx;
  const b = v01 + (v11 - v01) * tx;
  return a + (b - a) * ty;
};

const fbm = (lut, size, x, y, octaves = 4) => {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;
  let norm = 0;

  for (let i = 0; i < octaves; i += 1) {
    value += amplitude * sampleNoise(lut, size, x * frequency, y * frequency);
    norm += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }

  return value / norm;
};

const CloudField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return undefined;

    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d", { alpha: true });
    if (!offCtx) return undefined;

    const noiseSize = 128;
    const noiseLut = createNoiseLut(noiseSize);

    let width = 0;
    let height = 0;
    let dpr = 1;
    let simW = 0;
    let simH = 0;
    let imageData = null;
    let baseField = null;
    let rafId = 0;
    let time = 0;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const rebuildBaseField = () => {
      baseField = new Float32Array(simW * simH);
      imageData = offCtx.createImageData(simW, simH);

      for (let y = 0; y < simH; y += 1) {
        for (let x = 0; x < simW; x += 1) {
          const i = y * simW + x;
          const nx = x / simW;
          const ny = y / simH;

          const structure = fbm(noiseLut, noiseSize, nx * 4.2, ny * 2.8, 5);
          const softness = fbm(noiseLut, noiseSize, nx * 2.5 + 22, ny * 2 + 9, 3);
          const heightFalloff = smoothstep(0.02, 0.92, 1 - Math.abs(ny - 0.5) * 1.35);

          const density = clamp01((structure - 0.42) * 1.9 + softness * 0.24) * heightFalloff;
          baseField[i] = density;
        }
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.max(1, window.devicePixelRatio || 1);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      simW = Math.max(300, Math.floor(width / 3.4));
      simH = Math.max(180, Math.floor(height / 3.4));

      offscreen.width = simW;
      offscreen.height = simH;

      rebuildBaseField();
    };

    const render = () => {
      if (!prefersReducedMotion.matches) {
        time += 0.0032;
      }

      // Periodic wind so clouds don't always drift in one direction.
      const flowPhase = time * 0.32;
      const windX = Math.sin(flowPhase) * 1.9;
      const windY = Math.sin(flowPhase * 0.67 + 1.1) * 0.7;
      const flowX = time * 1.15 + windX;
      const flowY = time * 0.3 + windY;

      if (baseField && imageData) {
        for (let y = 0; y < simH; y += 1) {
          for (let x = 0; x < simW; x += 1) {
            const i = y * simW + x;
            const nx = x / simW;
            const ny = y / simH;

            const drift = fbm(
              noiseLut,
              noiseSize,
              nx * 2 + flowX,
              ny * 2 + flowY,
              3
            );

            const density = baseField[i] + (drift - 0.5) * 0.2;
            const alpha = smoothstep(0.32, 0.71, density) * 182;

            const p = i * 4;
            imageData.data[p] = 255;
            imageData.data[p + 1] = 255;
            imageData.data[p + 2] = 255;
            imageData.data[p + 3] = alpha;
          }
        }

        offCtx.putImageData(imageData, 0, 0);
      }

      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 0.72;
      ctx.imageSmoothingEnabled = true;
      ctx.filter = "contrast(108%)";
      ctx.drawImage(offscreen, 0, 0, width, height);
      ctx.filter = "none";

      rafId = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    rafId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="clouds-canvas" aria-hidden="true" />;
};

export default CloudField;
