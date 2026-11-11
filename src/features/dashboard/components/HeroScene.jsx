import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import GlassTube from '../../../components/common/GlassTube';
import { supportsWebGL, prefersReducedMotion } from '../../../utils/webgl';

const STRAND_A = '#2fbfa9';
const STRAND_B = '#ff8a6b';

function Helix() {
  const steps = 20;
  const rows = useMemo(() => Array.from({ length: steps }, (_, i) => ({ y: (i - steps / 2) * 0.26, a: i * 0.55 })), []);
  const r = 0.62;
  return (
    <group>
      {rows.map(({ y, a }, i) => (
        <group key={i}>
          <mesh position={[Math.cos(a) * r, y, Math.sin(a) * r]}><sphereGeometry args={[0.085, 16, 16]} /><meshStandardMaterial color={STRAND_A} emissive={STRAND_A} emissiveIntensity={0.35} roughness={0.3} /></mesh>
          <mesh position={[-Math.cos(a) * r, y, -Math.sin(a) * r]}><sphereGeometry args={[0.085, 16, 16]} /><meshStandardMaterial color={STRAND_B} emissive={STRAND_B} emissiveIntensity={0.35} roughness={0.3} /></mesh>
          <mesh position={[0, y, 0]} rotation={[0, -a, 0]}><boxGeometry args={[r * 2, 0.025, 0.025]} /><meshStandardMaterial color="#e6eef0" transparent opacity={0.55} /></mesh>
        </group>
      ))}
    </group>
  );
}

function Particles({ count = 36 }) {
  const ref = useRef();
  const pts = useMemo(() => Array.from({ length: count }, () => ({ p: [(Math.random() - 0.5) * 7, (Math.random() - 0.5) * 4.5, (Math.random() - 0.5) * 3 - 1], s: 0.02 + Math.random() * 0.035 })), [count]);
  useFrame(({ clock }) => { if (ref.current && !prefersReducedMotion()) ref.current.rotation.y = clock.getElapsedTime() * 0.03; });
  return (
    <group ref={ref}>
      {pts.map((d, i) => <mesh key={i} position={d.p}><sphereGeometry args={[d.s, 8, 8]} /><meshBasicMaterial color="#93dfd1" transparent opacity={0.55} /></mesh>)}
    </group>
  );
}

function Rings() {
  const a = useRef(); const b = useRef(); const core = useRef();
  useFrame(({ clock }) => {
    if (prefersReducedMotion()) return;
    const t = clock.getElapsedTime();
    a.current.rotation.set(1.2, t * 0.35, 0);
    b.current.rotation.set(0.5, -t * 0.25, 0.6);
    core.current.scale.setScalar(1 + Math.sin(t * 2) * 0.08);
  });
  return (
    <group position={[0, 0, -0.6]}>
      <mesh ref={a}><torusGeometry args={[2.1, 0.012, 12, 120]} /><meshBasicMaterial color="#93dfd1" transparent opacity={0.5} /></mesh>
      <mesh ref={b}><torusGeometry args={[2.7, 0.01, 12, 120]} /><meshBasicMaterial color="#ff8a6b" transparent opacity={0.4} /></mesh>
      <mesh ref={core}><icosahedronGeometry args={[0.28, 1]} /><meshStandardMaterial color="#2fbfa9" emissive="#2fbfa9" emissiveIntensity={0.9} wireframe /></mesh>
    </group>
  );
}

function Rig() {
  const helix = useRef(); const tubes = useRef(); const root = useRef();
  const still = prefersReducedMotion();
  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    if (still) return;
    helix.current.rotation.y = t * 0.45;
    tubes.current.position.y = Math.sin(t * 0.9) * 0.1;
    // gentle pointer parallax
    root.current.rotation.y += (pointer.x * 0.35 - root.current.rotation.y) * 0.05;
    root.current.rotation.x += (-pointer.y * 0.18 - root.current.rotation.x) * 0.05;
  });
  return (
    <group ref={root}>
      <group ref={helix} position={[1.25, 0, 0]} rotation={[0, 0, 0.18]}><Helix /></group>
      <group ref={tubes} position={[-1.35, -0.1, 0.3]}>
        <GlassTube liquid="#e11d48" position={[-0.65, 0, 0]} rotation={[0, 0.3, 0.22]} />
        <GlassTube liquid="#f2c94c" position={[0, 0.12, 0.35]} rotation={[0, 0, -0.04]} scale={1.1} />
        <GlassTube liquid="#2fbfa9" position={[0.7, -0.05, 0]} rotation={[0, -0.3, -0.24]} />
      </group>
      <Rings />
      <Particles />
    </group>
  );
}

function Fallback() {
  return (
    <div className="grid h-full w-full place-items-center" role="img" aria-label="Decorative illustration of test tubes and a DNA helix">
      <svg viewBox="0 0 240 200" className="h-full max-h-72 w-full animate-float">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${50 + i * 52} ${40 + (i === 1 ? -8 : 6)}) rotate(${(i - 1) * 10})`}>
            <rect x="-12" y="-6" width="24" height="10" rx="3" fill="#f4694a" />
            <path d="M-10 4h20v80a10 10 0 0 1-20 0z" fill="#dff7f2" fillOpacity=".35" stroke="#93dfd1" strokeWidth="2" />
            <path d="M-8 44h16v40a8 8 0 0 1-16 0z" fill={['#e11d48', '#f2c94c', '#2fbfa9'][i]} />
          </g>
        ))}
        <path d="M190 20c-30 20 30 40 0 60s30 40 0 60" stroke="#2fbfa9" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M190 20c30 20-30 40 0 60s-30 40 0 60" stroke="#ff8a6b" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/** Lightweight decorative hero scene (Mohammed). Booking forms never use WebGL. */
export default function HeroScene() {
  if (!supportsWebGL()) return <Fallback />;
  return (
    <div className="h-full w-full" aria-hidden="true">
      <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 6.2], fov: 42 }} gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }} frameloop={prefersReducedMotion() ? 'demand' : 'always'}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 5, 5]} intensity={1.8} />
        <pointLight position={[-4, -2, 3]} intensity={1.4} color="#ff8a6b" />
        <Rig />
      </Canvas>
    </div>
  );
}
