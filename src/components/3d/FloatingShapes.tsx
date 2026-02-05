"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingCube({ position, color, size = 0.5 }: { position: [number, number, number]; color: string; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

function FloatingSphere({ position, color, size = 0.3 }: { position: [number, number, number]; color: string; size?: number }) {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={3}>
      <mesh position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          metalness={0.5}
          roughness={0.3}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function FloatingTorus({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.3, 0.1, 16, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

function FloatingOctahedron({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.4]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.25}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export default function FloatingShapes() {
  return (
    <group>
      {/* Primary cyan shapes */}
      <FloatingCube position={[-3, 1.5, -2]} color="#00d9ff" size={0.4} />
      <FloatingSphere position={[3, -1, -1]} color="#00d9ff" size={0.25} />
      <FloatingTorus position={[-2.5, -1.5, -1.5]} color="#00d9ff" />

      {/* Secondary purple shapes */}
      <FloatingCube position={[2.5, 2, -2]} color="#7c3aed" size={0.35} />
      <FloatingSphere position={[-3, -0.5, -1]} color="#7c3aed" size={0.3} />
      <FloatingOctahedron position={[3.5, 0.5, -2]} color="#7c3aed" />

      {/* Accent pink shapes */}
      <FloatingTorus position={[2, -2, -1]} color="#ff006e" />
      <FloatingOctahedron position={[-2, 2.5, -2.5]} color="#ff006e" />

      {/* Additional depth shapes */}
      <FloatingCube position={[0, 3, -3]} color="#00d9ff" size={0.25} />
      <FloatingSphere position={[0, -3, -2]} color="#7c3aed" size={0.2} />
    </group>
  );
}
