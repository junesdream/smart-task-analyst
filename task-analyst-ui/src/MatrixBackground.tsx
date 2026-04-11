import React, { useEffect, useRef } from 'react';

const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas Größe an Fenster anpassen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Charaktere für den Regen (Katakana, Alphanumerisch)
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890あいうえおかきくけこさしすせそ";
    const charArray = chars.split("");

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    // Eine Drop pro Spalte, initialisiert mit y=1
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      // Schwarzer Hintergrund mit leichter Opazität für den Fade-Effekt
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0";
      ctx.font = fontSize + "px arial";

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33); // ca. 30 FPS

    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default MatrixBackground;