'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bloom, DepthOfField, Select, Selection, EffectComposer, Noise, Vignette, Outline, SelectiveBloom } from '@react-three/postprocessing'
import { Suspense, useRef, useMemo } from 'react';
import { Sphere } from '@react-three/drei';
import { ShaderMaterial, Mesh } from 'three';
import * as THREE from 'three';

function MovingSphere({ position, speed, size, material }:
    { position: [number, number, number], speed: number, size: number, material: ShaderMaterial }) {
    const sphereRef = useRef<Mesh | null>(null);

    useFrame((state, delta) => {
        if (!sphereRef.current) return;
        sphereRef.current.rotation.y += speed;
        sphereRef.current.position.x += Math.sin(sphereRef.current.rotation.y) * speed;
        sphereRef.current.position.z += Math.cos(sphereRef.current.rotation.y) * speed;
        sphereRef.current.position.y += Math.sin(sphereRef.current.rotation.y) * speed;
        material.uniforms.time.value += delta * Math.random() * 0.2;
    });

    return (
        <Sphere ref={sphereRef} args={[size, 500, 100]} position={position}>
            <primitive attach="material" object={material} />
        </Sphere>
    );
}

export default function ThreeCanvas() {
    const vertexShader = `
    varying vec2 vUv;
    uniform float time;

    void main() {
      vUv = uv;

      vec3 deformPosition = position + vec3(2.0, cos(position.x * 3.0 + time) * 0.2, 2.0);
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
    }), [fragmentShader, vertexShader]);

    return (
        <Canvas style={{ height: '100vh', zIndex: '0', position: 'absolute' }} className="h-full z-0 absolute" camera={{ position: [0, 0, 20], fov: 60 }}>
            <EffectComposer 
                multisampling={0}
                resolutionScale={0.5}
            >
                <Vignette eskil={false} offset={0.4} darkness={1} />
                <Noise opacity={0.05} />
            </EffectComposer>
            <ambientLight intensity={0.1} />
            <Suspense fallback={null}>
                {[...Array(15)].map((_, index) => {
                    const size = Math.random() * 3 + 0.5;
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
                            material={shaderMaterial}
                        />
                    );
                })}
            </Suspense>
        </Canvas>
    );
}


