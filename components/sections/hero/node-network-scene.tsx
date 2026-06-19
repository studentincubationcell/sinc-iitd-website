"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 72;
const SPHERE_RADIUS = 2.8;
const LINK_DISTANCE = 1.35;

function fibonacciSphere(i: number, n: number, radius: number) {
  const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
  const theta = Math.PI * (1 + Math.sqrt(5)) * i;
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi)
  );
}

function buildNetwork() {
  const positions: THREE.Vector3[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    positions.push(fibonacciSphere(i, NODE_COUNT, SPHERE_RADIUS));
  }

  const linePositions: number[] = [];
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      if (positions[i].distanceTo(positions[j]) < LINK_DISTANCE) {
        linePositions.push(
          positions[i].x,
          positions[i].y,
          positions[i].z,
          positions[j].x,
          positions[j].y,
          positions[j].z
        );
      }
    }
  }

  const pointArray = new Float32Array(NODE_COUNT * 3);
  positions.forEach((p, i) => {
    pointArray[i * 3] = p.x;
    pointArray[i * 3 + 1] = p.y;
    pointArray[i * 3 + 2] = p.z;
  });

  return {
    points: pointArray,
    lines: new Float32Array(linePositions),
  };
}

export function NodeNetworkScene({ scale = 1 }: { scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const { pointer } = useThree();

  const network = useMemo(() => buildNetwork(), []);

  const pointGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(network.points, 3));
    return geo;
  }, [network.points]);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(network.lines, 3));
    return geo;
  }, [network.lines]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    targetRotation.current.y = pointer.x * 0.45;
    targetRotation.current.x = pointer.y * 0.28;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current.y,
      delta * 2.5
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotation.current.x,
      delta * 2.5
    );
    groupRef.current.rotation.z += delta * 0.04;
  });

  return (
    <group ref={groupRef} scale={scale}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#9b7fd4"
          transparent
          opacity={0.28}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      <points geometry={pointGeometry}>
        <pointsMaterial
          size={0.055}
          color="#c4b5fd"
          transparent
          opacity={0.95}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      {/* Core hub — deep-tech focal node */}
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#f5a623" />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshBasicMaterial color="#9b7fd4" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}
