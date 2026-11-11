import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import GlassTube from '../../../components/common/GlassTube';
import { supportsWebGL, prefersReducedMotion } from '../../../utils/webgl';
import { SAMPLE_COLORS } from '../categoryMeta';

function Spinning({ color }) {
  const ref = useRef();
  const still = prefersReducedMotion();
  useFrame(({ clock, pointer }) => {
    if (!ref.current || still) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.7;
    ref.current.rotation.z = 0.25 + pointer.x * 0.25;
    ref.current.rotation.x = -pointer.y * 0.2;
    ref.current.position.y = Math.sin(t * 1.3) * 0.08;
  });
  return <group ref={ref} rotation={[0, 0.6, 0.25]}><GlassTube liquid={color} scale={1.25} /></group>;
}

function Fallback({ color }) {
  return (
    <svg viewBox="0 0 64 96" role="img" aria-label="Sample tube illustration" className="h-full w-full max-h-56 animate-float">
      <rect x="20" y="6" width="24" height="10" rx="3" fill="#f4694a" />
      <path d="M22 16h20v56a10 10 0 0 1-20 0z" fill="#dff7f2" stroke="#93dfd1" strokeWidth="2" />
      <path d="M24 44h16v28a8 8 0 0 1-16 0z" fill={color} />
    </svg>
  );
}

/** Decorative 3D test tube whose liquid colour reflects the sample type. Non-critical; falls back to an SVG. */
export default function SampleTube3D({ sampleType }) {
  const color = SAMPLE_COLORS[sampleType] ?? '#c81e3a';
  if (!supportsWebGL()) return <Fallback color={color} />;
  return (
    <div className="h-full w-full" aria-hidden="true">
      <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 4.2], fov: 38 }} gl={{ alpha: true, antialias: true }} frameloop={prefersReducedMotion() ? 'demand' : 'always'}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 4, 5]} intensity={1.6} />
        <pointLight position={[-3, -1, 2]} intensity={1.2} color="#93dfd1" />
        <Suspense fallback={null}><Spinning color={color} /></Suspense>
      </Canvas>
    </div>
  );
}
