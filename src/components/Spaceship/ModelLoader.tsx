import { useGLTF } from '@react-three/drei';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

const ModelLoader = () => {
  const [modelInfo, setModelInfo] = useState('Loading model...');
  
  try {
    const { scene, materials, animations } = useGLTF('/spaceship.glb');
    
    useEffect(() => {
      // Log basic model info
      const info = {
        type: scene.type,
        childrenCount: scene.children.length,
        materials: Object.keys(materials || {}),
        animations: animations?.map(a => a.name) || [],
        position: { ...scene.position },
        rotation: { ...scene.rotation },
        scale: { ...scene.scale }
      };
      
      console.log('=== MODEL INFO ===');
      console.log('Scene:', info);
      
      // Log detailed hierarchy
      console.log('=== SCENE HIERARCHY ===');
      scene.traverse((child) => {
        console.log(`${child.type}: ${child.name || 'unnamed'}`, {
          visible: child.visible,
          position: { ...child.position },
          rotation: { ...child.rotation },
          scale: { ...child.scale },
          material: child.material ? Object.keys(child.material).filter(k => !k.startsWith('_')) : 'none'
        });
      });
      
      setModelInfo(JSON.stringify(info, null, 2));
      
      // Basic setup
      scene.scale.set(0.1, 0.1, 0.1);
      scene.rotation.y = Math.PI / 2;
      scene.position.set(0, 0, 0);
      
    }, [scene, materials, animations]);
    
    return (
      <>
        <primitive object={scene} />
        {/* Fallback cube that's always visible */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="green" wireframe />
        </mesh>
      </>
    );
    
  } catch (error) {
    const errorMsg = `Error loading model: ${error.message}`;
    console.error(errorMsg, error);
    setModelInfo(errorMsg);
    
    return (
      <group>
        <mesh>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="red" wireframe />
        </mesh>
        <mesh position={[0, 0, 2]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="blue" wireframe />
        </mesh>
      </group>
    );
  }
};

// Preload the model
const preloadModel = async () => {
  try {
    await useGLTF.preload('/spaceship.glb');
    console.log('Model preloaded successfully');
  } catch (error) {
    console.error('Failed to preload model:', error);
  }
};

preloadModel();

export default ModelLoader;
