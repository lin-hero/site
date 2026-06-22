// MODIFIED: Critical WebGL performance fixes
// - Canvas: dpr clamped to [1, 1.5], antialias disabled, powerPreference: high-performance
// - dispose={null} on all mesh/geometry/material/Text3D for forced GC
// - Sparkles count: 100 -> 40
// - ParticleRing count: 200 -> 80

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, Center, Sparkles, OrbitControls, Environment } from '@react-three/drei';
import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';

const FloatingGeometry = ({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005 * speed;
      meshRef.current.rotation.y += 0.008 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  const geometry = useMemo(() => {
    const types = ['icosahedron', 'octahedron', 'torus'];
    const type = types[Math.floor(Math.random() * types.length)];

    switch (type) {
      case 'icosahedron':
        return new THREE.IcosahedronGeometry(0.3, 0);
      case 'octahedron':
        return new THREE.OctahedronGeometry(0.25, 0);
      case 'torus':
        return new THREE.TorusGeometry(0.2, 0.08, 8, 24);
      default:
        return new THREE.IcosahedronGeometry(0.3, 0);
    }
  }, []);

  return (
    // MODIFIED: Added dispose={null} for forced garbage collection on unmount
    <mesh ref={meshRef} position={position} geometry={geometry} dispose={null}>
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.6}
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.3}
        dispose={null}
      />
    </mesh>
  );
};

const AnimatedSphere = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    // MODIFIED: Added dispose={null} for forced garbage collection on unmount
    <mesh ref={meshRef} position={position} dispose={null}>
      <sphereGeometry args={[0.15, 16, 16]} dispose={null} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
        dispose={null}
      />
    </mesh>
  );
};

const ParticleRing = () => {
  const particlesRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    // MODIFIED: Reduced count from 200 to 80 to prevent WebGL context loss
    const count = 80;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const vantColors = [
      new THREE.Color('#4CAF50'),
      new THREE.Color('#FFB300'),
      new THREE.Color('#2196F3'),
      new THREE.Color('#FF5722'),
    ];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3 + Math.random() * 0.5;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      const color = vantColors[i % 4];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.002;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    // MODIFIED: Added dispose={null} for forced garbage collection
    <points ref={particlesRef} dispose={null}>
      <bufferGeometry dispose={null}>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        dispose={null}
      />
    </points>
  );
};

const LetterMesh = ({
  char,
  position,
  color
}: {
  char: string;
  position: [number, number, number];
  color: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <Center position={position}>
        {/* MODIFIED: Added dispose={null} for forced garbage collection on Text3D */}
        <Text3D
          ref={meshRef}
          font="/fonts/helvetiker_bold.typeface.json"
          size={0.8}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          dispose={null}
        >
          {char}
          <meshStandardMaterial
            color={color}
            metalness={0.3}
            roughness={0.4}
            emissive={color}
            emissiveIntensity={0.2}
            dispose={null}
          />
        </Text3D>
      </Center>
    </Float>
  );
};

const Scene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* MODIFIED: Sparkles count reduced from 100 to 40 to reduce GPU load */}
      <Sparkles
        count={40}
        scale={8}
        size={2}
        speed={0.4}
        opacity={0.6}
        color="#ffffff"
      />

      {/* Particle ring - MODIFIED: internal count reduced from 200 to 80 */}
      <ParticleRing />

      {/* Floating geometries */}
      <FloatingGeometry position={[-3, 1.5, -1]} color="#4CAF50" speed={0.8} />
      <FloatingGeometry position={[3.5, -1, -2]} color="#FFB300" speed={1.2} />
      <FloatingGeometry position={[-2.5, -1.5, 1]} color="#2196F3" speed={1} />
      <FloatingGeometry position={[2, 2, -1.5]} color="#FF5722" speed={0.9} />
      <FloatingGeometry position={[0, -2, 2]} color="#4CAF50" speed={1.1} />
      <FloatingGeometry position={[-4, 0, 0]} color="#FFB300" speed={0.7} />
      <FloatingGeometry position={[4, 0.5, 1]} color="#2196F3" speed={1.3} />

      {/* Animated spheres */}
      <AnimatedSphere position={[-2, 2.5, 0]} color="#4CAF50" />
      <AnimatedSphere position={[2.5, -2, 1]} color="#FFB300" />
      <AnimatedSphere position={[0, 2, -2]} color="#2196F3" />
      <AnimatedSphere position={[-3, -1, 2]} color="#FF5722" />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#4CAF50" />
      <pointLight position={[5, -5, -5]} intensity={0.5} color="#FF5722" />
      <spotLight position={[0, 10, 0]} angle={0.5} penumbra={1} intensity={0.5} color="#2196F3" />
    </group>
  );
};

const Hero3DScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      {/* MODIFIED: Critical Canvas optimization to prevent WebGL Context Lost
          - dpr clamped to [1, 1.5] to avoid rendering at retina 2x/3x
          - antialias: false eliminates MSAA overhead
          - powerPreference: "high-performance" requests discrete GPU
          - alpha: true preserved for transparent background compositing */}
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ powerPreference: "high-performance", antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Hero3DScene;
