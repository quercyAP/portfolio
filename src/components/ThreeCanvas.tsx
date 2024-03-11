'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useMemo } from 'react';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';
import { Sphere } from '@react-three/drei';
import { ShaderMaterial, Mesh } from 'three';
import * as THREE from 'three';
import { div } from 'three/examples/jsm/nodes/Nodes.js';

function MovingSphere({ position, speed, size }: { position: [number, number, number], speed: number, size: number }) {
    const sphereRef = useRef<Mesh | null>(null);

    const vertexShader = `
    varying vec2 vUv;
    uniform float time;

    void main() {
      vUv = uv;

      // Déformation basée sur le temps et la position
      vec3 deformPosition = position + vec3(5.0, cos(position.x * 3.0 + time) * 0.2, 2.0);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(deformPosition, 1.0);
    }
  `;

    const fragmentShader = `
    uniform vec3 color;

    void main() {
      gl_FragColor = vec4(color, 1.0);
    }
  `;

    const shaderMaterial = useMemo(() => new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            time: { value: 0 },
            color: { value: new THREE.Color(9 / 255, 7 / 255, 17 / 255) },
        },
    }), []);

    useFrame((state, delta) => {
        if (!sphereRef.current) return;
        sphereRef.current.rotation.y += speed;
        sphereRef.current.position.x += Math.sin(sphereRef.current.rotation.y) * speed;
        sphereRef.current.position.z += Math.cos(sphereRef.current.rotation.y) * speed;
        sphereRef.current.position.y += Math.sin(sphereRef.current.rotation.y) * speed;
        shaderMaterial.uniforms.time.value += delta * Math.random() * 3;
    });

    return (
        <Sphere ref={sphereRef} args={[size, 32, size]} position={position}>
            <primitive attach="material" object={shaderMaterial} />
        </Sphere>
    );
}

export default function ThreeCanvas() {
    return (
        <Canvas style={{ height: '100vh', zIndex: '0', position: 'absolute'}} camera={{ position: [0, 0, 20], fov: 60 }}>
            <EffectComposer>
                <DepthOfField target={[0, 0, 20]} focalLength={0.001} bokehScale={15} height={480} />
            </EffectComposer>
            <ambientLight intensity={0.1} />
            <Suspense fallback={null}>
                {[...Array(15)].map((_, index) => {
                    const size = Math.random() * 0.5 + 0.5;
                    return (
                        <MovingSphere
                            key={index}
                            position={[
                                -10 + Math.random() * 25,
                                -10 + Math.random() * 25,
                                -10 + Math.random() * 25,
                            ]}
                            speed={Math.random() * 0.005}
                            size={size}
                        />
                    );
                })}
            </Suspense>
        </Canvas>
    );
}


