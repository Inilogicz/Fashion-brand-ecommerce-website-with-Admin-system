"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, PerspectiveCamera, Stars, Sparkles, MeshTransmissionMaterial, MeshDistortMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// A Flowing Silk Cloth Simulation
function FlowingSilk() {
    const mesh = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!mesh.current) return;
        const t = state.clock.getElapsedTime();

        // Gentle wave motion
        const positionAttribute = mesh.current.geometry.attributes.position;
        const vertex = new THREE.Vector3();

        for (let i = 0; i < positionAttribute.count; i++) {
            vertex.fromBufferAttribute(positionAttribute, i);
            // Calculate wave Z offset based on X and Y positions + time
            const waveX1 = 0.5 * Math.sin(vertex.x * 2 + t);
            const waveX2 = 0.25 * Math.sin(vertex.x * 3 + t * 2);
            const waveY1 = 0.1 * Math.sin(vertex.y * 5 + t * 0.5);

            // Only modify Z to create ripples
            // We use the original plane geometry which is flat on Z
            // To do this properly without re-creating geometry every frame, we need a shader or a custom plan geometry
            // ensuring we don't drift. For performance in this snippet, let's use a simpler approach: 
            // relying on MeshDistortMaterial on a high-res plane.
        }
        // Actually, MeshDistortMaterial on a plane is often chaotic.
        // Let's stick to MeshDistortMaterial but on a specific shape or use a specialized shader. 
        // Better: Use a simpler wobbly sphere that looks like liquid metal, but bigger and flatter? 
        // No, user specifically hated "ball like". 
        // Let's try a distorted plane using standard noise logic in a shader is best but complex for snippet.
        // Let's use <Wave> abstraction or simple vertex manipulation?
        // Let's use a high-res Plane and MeshPhysicalMaterial, rotating it to look like a floor/wall?
    });

    // We will use a distorted plane via MeshReflectorMaterial + normalMap animation or just generic distortion?
    // Let's go with a massive, slow-moving liquid plane that fills the bottom half.

    return (
        <group rotation={[-Math.PI / 3, 0, 0]} position={[0, -2, 0]}>
            <mesh ref={mesh} scale={8}>
                <planeGeometry args={[1, 1, 64, 64]} />
                <MeshDistortMaterial
                    speed={1.5}
                    distort={0.4} // Significant flow
                    color="#1a1a1a" // Dark Satin
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>
        </group>
    );
}

// Actually, let's look for a specialized "Cloth" implementation logic or stick to the "Liquid" concept but make it "sheet-like".
// A "Sheet" of liquid.
function LiquidSheet() {
    const materialRef = useRef<any>(null);

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.distort = 0.4 + Math.sin(clock.getElapsedTime()) * 0.1;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh rotation={[-Math.PI / 4, 0, 0]} scale={3}>
                <planeGeometry args={[6, 6, 64, 64]} />
                <MeshDistortMaterial
                    ref={materialRef}
                    speed={1}
                    distort={0.4}
                    radius={1} // Important for plane
                    color="#080808" // Deepest Obsidian
                    roughness={0.15} // Satin-like
                    metalness={0.9}
                    bumpScale={0.01}
                />
            </mesh>
        </Float>
    );
}

function Rig() {
    const { camera, mouse } = useThree();
    useFrame(() => {
        camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05;
        camera.position.y += (mouse.y * 2 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);
    });
    return null;
}

export function ThreeScene() {
    return (
        <div className="absolute inset-0 z-0 bg-[#F4F1E7]">
            {/* Canvas */}
            <Canvas gl={{ antialias: false, alpha: false }} dpr={[1, 1.5]}>
                <color attach="background" args={["#F4F1E7"]} /> {/* Match Cream bg to blend */}

                {/* Camera Rig */}
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
                <Rig />

                {/* Lighting */}
                <ambientLight intensity={0.5} color="#C2A891" />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffffff" castShadow />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#C2A891" />

                {/* Objects */}
                <LiquidSheet />

                {/* Atmosphere particles */}
                <Sparkles
                    count={150}
                    scale={10}
                    size={2}
                    speed={0.4}
                    opacity={0.5}
                    color="#0C0C0C" // Dark sparkles for contrast
                />

                {/* Environment Reflections */}
                <Environment preset="studio" />

                {/* Cinematic Post-Processing */}
                <EffectComposer disableNormalPass>
                    {/* Soft Bloom for the jewelry look */}
                    <Bloom luminanceThreshold={0.5} mipmapBlur intensity={0.8} radius={0.4} />
                    {/* Subtle Noise for texture */}
                    <Noise opacity={0.03} />
                    {/* Vignette to focus center */}
                    <Vignette eskil={false} offset={0.1} darkness={0.5} />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
