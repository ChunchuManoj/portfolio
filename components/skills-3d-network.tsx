"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

// Fix the 3D skills visualization and optimize performance

// Reduce the number of skill nodes for better performance
const skillsData = [
  // Programming Languages
  {
    name: "Java",
    category: "Programming",
    proficiency: 0.9,
    position: [0, 0, 0],
    related: ["DSA", "OOP"],
  },
  {
    name: "Python",
    category: "Programming",
    proficiency: 0.85,
    position: [2, 1, 1],
    related: ["AI", "Data Analysis"],
  },
  {
    name: "C",
    category: "Programming",
    proficiency: 0.75,
    position: [-2, -1, 1],
    related: ["DSA"],
  },

  // Web Technologies
  {
    name: "HTML",
    category: "Web",
    proficiency: 0.8,
    position: [3, -2, -1],
    related: ["CSS", "JavaScript"],
  },
  {
    name: "CSS",
    category: "Web",
    proficiency: 0.8,
    position: [4, -1, -2],
    related: ["HTML"],
  },
  {
    name: "JavaScript",
    category: "Web",
    proficiency: 0.75,
    position: [5, 0, -1],
    related: ["HTML", "CSS"],
  },

  // Data & AI
  {
    name: "SQL",
    category: "Data",
    proficiency: 0.85,
    position: [-3, 2, -2],
    related: ["Data Analysis"],
  },
  {
    name: "AI",
    category: "AI",
    proficiency: 0.8,
    position: [1, 3, -2],
    related: ["Python", "Data Analysis"],
  },
  {
    name: "Data Analysis",
    category: "Data",
    proficiency: 0.85,
    position: [-1, 4, -1],
    related: ["Python", "AI", "SQL"],
  },

  // Core CS
  {
    name: "DSA",
    category: "CS",
    proficiency: 0.85,
    position: [3, 3, 2],
    related: ["Java", "Python", "C"],
  },
  {
    name: "OOP",
    category: "CS",
    proficiency: 0.9,
    position: [-4, 2, 3],
    related: ["Java"],
  },
];

// Color mapping for different skill categories with cyberpunk theme
const categoryColors = {
  Programming: new THREE.Color("#00ffff"), // Cyber blue
  Web: new THREE.Color("#ff00ff"), // Neon purple
  Data: new THREE.Color("#ffff00"), // Neon yellow
  AI: new THREE.Color("#00ff88"), // Cyber green
  Tools: new THREE.Color("#ff3366"), // Neon pink
  CS: new THREE.Color("#00ccff"), // Electric blue
};

// Skill Node component
function SkillNode({ skill, hovered, setHovered }) {
  const ref = useRef();
  const isHovered = hovered === skill.name;
  const color = categoryColors[skill.category] || new THREE.Color("#FFFFFF");
  const [clicked, setClicked] = useState(false);
  const glowRef = useRef();

  // Animate the node
  useFrame((state) => {
    if (!ref.current) return;

    // Gentle floating animation
    ref.current.position.y +=
      Math.sin(state.clock.elapsedTime * 0.5 + skill.position[0]) * 0.002;

    // Pulse effect based on proficiency
    const baseScale = clicked ? 1.5 : 0.2 + skill.proficiency * 0.15;
    const pulseEffect =
      Math.sin(state.clock.elapsedTime * (0.5 + skill.proficiency * 0.5)) *
      0.05;
    const finalScale = baseScale + (clicked ? pulseEffect * 0.5 : pulseEffect);

    ref.current.scale.set(finalScale, finalScale, finalScale);

    // Rotate slowly
    ref.current.rotation.y += 0.002;

    // Animate glow effect
    if (glowRef.current) {
      glowRef.current.material.opacity =
        0.4 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
    }
  });

  const handleClick = () => {
    setClicked(!clicked);
    setHovered(isHovered ? null : skill.name);
  };

  return (
    <group
      position={skill.position}
      ref={ref}
      onClick={handleClick}
      onPointerOver={() => setHovered(skill.name)}
      onPointerOut={() => setHovered(null)}
    >
      {/* Main skill sphere */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHovered || clicked ? 2 : 0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent={true}
          opacity={isHovered || clicked ? 0.3 : 0.1}
          emissive={color}
          emissiveIntensity={isHovered || clicked ? 1 : 0.3}
        />
      </mesh>

      {/* Skill name */}
      <Html position={[0, 1.5, 0]} center distanceFactor={10}>
        <motion.div
          className={`px-3 py-1 rounded-full text-white text-sm font-medium transition-all duration-300 ${
            isHovered || clicked
              ? "bg-gradient-to-r from-cyan-500 to-blue-500 scale-110"
              : "bg-gray-800/80"
          }`}
          style={{
            boxShadow:
              isHovered || clicked
                ? `0 0 10px 2px ${color.getStyle()}`
                : "none",
          }}
        >
          {skill.name}
        </motion.div>
      </Html>

      {/* Proficiency ring */}
      {(isHovered || clicked) && (
        <group>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.3, 1.4, 32]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={2}
              transparent={true}
              opacity={0.8}
            />
          </mesh>
          <Html position={[0, -1.8, 0]} center>
            <div className="px-3 py-2 bg-gray-800/90 rounded-lg text-xs text-white backdrop-blur-md border border-gray-700">
              <div className="mb-1">
                Proficiency: {Math.round(skill.proficiency * 100)}%
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${skill.proficiency * 100}%`,
                    background: `linear-gradient(90deg, ${color.getStyle()}, ${new THREE.Color(
                      color
                    )
                      .offsetHSL(0.1, 0, 0)
                      .getStyle()})`,
                  }}
                ></div>
              </div>
            </div>
          </Html>
        </group>
      )}
    </group>
  );
}

// Simplified connection line between skills
function ConnectionLine({ start, end, color, hovered }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;

    // Simple animation for the line
    const material = ref.current.material;
    if (material) {
      material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  // Create a line geometry between two points
  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  }, [start, end]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <line ref={ref} geometry={lineGeometry}>
      <lineBasicMaterial
        color={color}
        transparent={true}
        opacity={hovered ? 0.8 : 0.4}
        linewidth={1}
      />
    </line>
  );
}

// Central neural network hub
function CentralHub() {
  const ref = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.y = state.clock.elapsedTime * 0.1;
    ref.current.rotation.z = state.clock.elapsedTime * 0.05;

    // Pulse glow effect
    if (glowRef.current) {
      const pulse = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      glowRef.current.material.opacity = pulse;
      glowRef.current.scale.set(
        1 + pulse * 0.3,
        1 + pulse * 0.3,
        1 + pulse * 0.3
      );
    }
  });

  return (
    <group ref={ref}>
      <Sphere args={[0.5, 16, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={1}
          roughness={0.3}
          metalness={0.8}
        />
      </Sphere>

      {/* Glow effect */}
      <Sphere ref={glowRef} args={[0.8, 16, 16]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#00ffff"
          transparent={true}
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Energy beams emanating from central hub */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 0.8;
        const y = Math.sin(angle) * 0.8;

        return (
          <mesh key={i} position={[x, y, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial
              color="#00ffff"
              emissive="#00ffff"
              emissiveIntensity={2}
              transparent
              opacity={0.7}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Camera controller
function CameraController() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 20);
  }, [camera]);

  return (
    <OrbitControls enableZoom={true} enablePan={false} enableRotate={true} />
  );
}

// SkillConnections component to draw connections between related skills
function SkillConnections({ skills, hovered }) {
  // Create connections only for the hovered skill or show all connections if nothing is hovered
  const connections = useMemo(() => {
    const result = [];

    skills.forEach((skill) => {
      if (hovered === skill.name || !hovered) {
        skill.related.forEach((relatedName) => {
          const relatedSkill = skills.find((s) => s.name === relatedName);
          if (relatedSkill) {
            result.push({
              from: skill.position,
              to: relatedSkill.position,
              color: categoryColors[skill.category],
              key: `${skill.name}-${relatedName}`,
            });
          }
        });
      }
    });

    return result;
  }, [skills, hovered]);

  return (
    <>
      {connections.map((connection) => (
        <ConnectionLine
          key={connection.key}
          start={connection.from}
          end={connection.to}
          color={connection.color}
          hovered={hovered !== null}
        />
      ))}
    </>
  );
}

// Instructions component with fixed alignment within the section
function Instructions() {
  return (
    <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-gray-800/90 rounded-lg text-white text-sm backdrop-blur-md border border-gray-700 shadow-lg shadow-cyan-500/20 whitespace-nowrap">
      <p className="text-center">
        Click on a skill for details | Drag to rotate | Scroll to zoom
      </p>
    </div>
  );
}

// Optimize the main component
export default function Skills3DNetwork() {
  const [hovered, setHovered] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state to ensure we only run client-side code
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-[70%] h-[400px] border-2 border-primary mx-auto relative rounded-lg" // Added rounded-lg class
    >
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        gl={{
          antialias: false, // Disable antialiasing for performance
          alpha: true,
          powerPreference: "high-performance",
          precision: "lowp", // Use lower precision for better performance
        }}
        dpr={[0.8, 1.5]} // Reduce resolution for performance
        performance={{ min: 0.5 }} // Allow ThreeJS to reduce quality for performance
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {/* Central hub */}
        <CentralHub />

        {/* Skill nodes */}
        {skillsData.map((skill) => (
          <SkillNode
            key={skill.name}
            skill={skill}
            hovered={hovered}
            setHovered={setHovered}
          />
        ))}

        {/* Connections between skills */}
        <SkillConnections skills={skillsData} hovered={hovered} />

        <CameraController />
      </Canvas>
      {/* Instructions with fixed alignment within the section */}
      <Instructions />
    </motion.div>
  );
}
