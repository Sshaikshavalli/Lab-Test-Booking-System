/** Shared three.js primitive: a glass test tube with liquid. Used by both 3D scenes. */
export default function GlassTube({ liquid = '#c81e3a', fill = 0.9, capColor = '#f4694a', ...group }) {
  const glass = { color: '#dff7f2', transparent: true, opacity: 0.28, roughness: 0.05, metalness: 0.1 };
  const h = fill; // liquid column height
  return (
    <group {...group}>
      <mesh><cylinderGeometry args={[0.28, 0.28, 1.6, 40, 1, true]} /><meshStandardMaterial {...glass} side={2} depthWrite={false} /></mesh>
      <mesh position={[0, -0.8, 0]}><sphereGeometry args={[0.28, 40, 20, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} /><meshStandardMaterial {...glass} side={2} depthWrite={false} /></mesh>
      <mesh position={[0, -0.8 + h / 2, 0]}><cylinderGeometry args={[0.235, 0.235, h, 32]} /><meshStandardMaterial color={liquid} roughness={0.25} emissive={liquid} emissiveIntensity={0.18} /></mesh>
      <mesh position={[0, -0.8, 0]}><sphereGeometry args={[0.235, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} /><meshStandardMaterial color={liquid} roughness={0.25} emissive={liquid} emissiveIntensity={0.18} /></mesh>
      <mesh position={[0, 0.88, 0]}><cylinderGeometry args={[0.31, 0.31, 0.22, 32]} /><meshStandardMaterial color={capColor} roughness={0.4} /></mesh>
      <mesh position={[0, 0.74, 0]}><cylinderGeometry args={[0.3, 0.3, 0.06, 32]} /><meshStandardMaterial color="#ffffff" roughness={0.3} /></mesh>
    </group>
  );
}
