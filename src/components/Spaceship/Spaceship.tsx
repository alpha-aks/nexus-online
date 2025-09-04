import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect } from 'react';

const Spaceship = () => {
  try {
    const { scene } = useGLTF('/spaceship.glb');
    
    useEffect(() => {
      console.log('Spaceship model loaded successfully');
      
      // Log model information
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          console.log('Mesh found:', child.name);
          console.log('Geometry:', child.geometry);
          console.log('Material:', child.material);
        }
      });
      
      // Scale and position the model
      scene.scale.set(0.1, 0.1, 0.1);
      scene.rotation.y = Math.PI / 2;
      
      // Set position to origin
      scene.position.set(0, 0, 0);
      
      // Enable shadows if needed
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      
    }, [scene]);
    
    return <primitive object={scene} />;
    
  } catch (error) {
    console.error('Error loading spaceship model:', error);
    
    // Return a simple fallback cube if model fails to load
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    );
  }
};

// Add error handling for preload
const preloadModel = async () => {
  try {
    await useGLTF.preload('/spaceship.glb');
    console.log('Spaceship model preloaded successfully');
  } catch (error) {
    console.error('Error preloading spaceship model:', error);
  }
};

// Pre-load the model
preloadModel();

export default Spaceship;
