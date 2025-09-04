import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

const ModelLoader = () => {
  
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
        const childInfo: any = {
          visible: child.visible,
          position: { ...child.position },
          rotation: { ...child.rotation },
          scale: { ...child.scale },
        };
        
        // Only access material if it exists and the child is a Mesh
        if ('material' in child) {
          const meshChild = child as THREE.Mesh;
          childInfo.material = meshChild.material ? 
            Object.keys(meshChild.material).filter(k => !k.startsWith('_')) : 
            'none';
        } else {
          childInfo.material = 'none';
        }
        
        console.log(`${child.type}: ${child.name || 'unnamed'}`, childInfo);
      });
      
      console.log('Model info:', info);
      
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
    
  } catch (error: unknown) {
    const errorMsg = `Error loading model: ${error instanceof Error ? error.message : 'Unknown error'}`;
    console.error(errorMsg, error);
    console.error(errorMsg);
    
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
