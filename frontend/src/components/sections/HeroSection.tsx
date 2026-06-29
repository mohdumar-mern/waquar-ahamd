"use client";
import { useEffect, useRef } from "react";
import { useScrollPhase }   from "@/hooks/useScrollPhase";
import { useScrollStore }   from "@/store/useScrollStore";
import { useUIStore }       from "@/store/useUIStore";
import HUDOverlay           from "@/components/ui/HUDOverlay";
import ScrollIndicator      from "@/components/ui/ScrollIndicator";

// Three.js is imported dynamically to avoid SSR issues
let THREE: typeof import("three") | null = null;
if (typeof window !== "undefined") {
  import("three").then((m) => { THREE = m; });
}

export default function HeroSection() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const sceneRef   = useRef<{
    renderer: import("three").WebGLRenderer;
    animId  : number;
  } | null>(null);
  const scrollRef  = useRef(0);

  const { setProgress } = useScrollStore();
  const { setLoaded }   = useUIStore();

  // Track scroll inside the outer wrapper
  useScrollPhase();

  useEffect(() => {
    // Dynamic import to keep SSR safe
    import("three").then((THREE) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      import("@/lib/three/sceneBuilder").then(({ buildEnvironment }) =>
      import("@/lib/three/carBuilder").then(({ buildF1Car }) =>
      import("@/lib/three/lightingSetup").then(({ setupLighting }) =>
      import("@/lib/three/particleSystem").then(({ createParticleSystem }) =>
      import("@/lib/three/cameraController").then(({ updateCamera }) => {

        // ── Renderer ───────────────────────────────────────────────────────────
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.9;

        // ── Scene ──────────────────────────────────────────────────────────────
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        scene.fog = new THREE.FogExp2(0x000000, 0.018);

        // ── Camera ─────────────────────────────────────────────────────────────
        const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 200);
        camera.position.set(6, 2.5, 8);

        // ── Build scene ────────────────────────────────────────────────────────
        const { speedLines }         = buildEnvironment(scene);
        const { car, wheels }        = buildF1Car();
        const { underGlow }          = setupLighting(scene);
        const particles              = createParticleSystem();
        scene.add(car);
        scene.add(particles.points);

        // ── Resize ─────────────────────────────────────────────────────────────
        const onResize = () => {
          renderer.setSize(canvas.clientWidth, canvas.clientHeight);
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        };
        window.addEventListener("resize", onResize);

        // ── Scroll sync ────────────────────────────────────────────────────────
        const onScroll = () => {
          const el  = document.documentElement;
          const max = el.scrollHeight - el.clientHeight;
          scrollRef.current = max > 0 ? window.scrollY / max : 0;
          setProgress(scrollRef.current);
        };
        window.addEventListener("scroll", onScroll, { passive: true });

        // ── Animate ────────────────────────────────────────────────────────────
        let t = 0;
        let phase = 0;

        const tick = () => {
          const id = requestAnimationFrame(tick);
          sceneRef.current = { renderer, animId: id };
          t += 0.016;

          const scroll = scrollRef.current;
          if      (scroll < 0.12) phase = 0;
          else if (scroll < 0.25) phase = 1;
          else if (scroll < 0.40) phase = 2;
          else if (scroll < 0.65) phase = 3;
          else if (scroll < 0.85) phase = 4;
          else                     phase = 5;

          // Car Z travel
          const carZ = phase >= 3 ? -Math.pow(Math.min((scroll - 0.4) / 0.25, 1), 2) * 60 : 0;
          car.position.z = carZ;

          // Wheel spin
          const spin = phase >= 3 ? Math.min((scroll - 0.4) / 0.25, 1) * 0.4 : 0;
          wheels.forEach((w) => { w.rotation.x += spin; });

          // Camera
          updateCamera(camera, phase, scroll, t, carZ);

          // Particles
          particles.update(carZ, phase);

          // Under-glow
          underGlow.position.set(car.position.x, 0.2, carZ);
          underGlow.intensity = phase >= 2 ? 2 + Math.sin(t * 8) * 0.5 : 0.4;

          // Speed lines opacity
          const speedT = phase >= 3 ? Math.min((scroll - 0.4) / 0.25, 1) : 0;
          speedLines.forEach((l) => {
            (l.material as THREE.LineBasicMaterial).opacity = speedT * 0.5;
            l.position.z = carZ;
          });

          renderer.render(scene, camera);
        };
        tick();
        setLoaded(true);

        // ── Cleanup ────────────────────────────────────────────────────────────
        return () => {
          window.removeEventListener("resize", onResize);
          window.removeEventListener("scroll", onScroll);
          cancelAnimationFrame(sceneRef.current?.animId ?? 0);
          renderer.dispose();
        };
      })))));
    });
  }, [setLoaded, setProgress]);

  return (
    <section className="relative" style={{ height: "700vh" }}>
      {/* Sticky 3D canvas */}
      <div className="sticky top-0 w-full h-screen">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <HUDOverlay />
        <ScrollIndicator />

        {/* Hero text (phase 0) */}
        <div className="absolute bottom-40 left-12 pointer-events-none">
          <p className="text-[9px] tracking-[6px] text-racing-red mb-3">FORMULA 1 SPECIALIST</p>
          <h1 className="text-5xl lg:text-7xl font-black uppercase leading-tight">
            <span className="block">CRAFTING</span>
            <span className="block" style={{ WebkitTextStroke: "1px #e8000d", color: "transparent" }}>VELOCITY</span>
            <span className="block">IN 3D</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
