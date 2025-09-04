import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import Spaceship from './Spaceship';

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode, onError?: (error: Error) => void }, 
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode, onError?: (error: Error) => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error in 3D scene:', error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'red',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div>
            <h2>Something went wrong with the 3D scene</h2>
            <p>Please refresh the page to try again</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading overlay component
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center style={{ color: 'white' }}>
      {Math.round(progress)}% loaded
    </Html>
  );
}

// Main Experience component
const Experience = () => {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Log Three.js version for debugging
    console.log('Three.js version:', THREE.REVISION);
  }, []);

  if (error) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'red',
        background: 'black',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div>
          <h2>Error loading 3D content</h2>
          <p>{error.message}</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#333',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', background: 'black' }}>
      <ErrorBoundary onError={setError}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true
          }}
          onCreated={({ gl }) => {
            console.log('WebGL context created');
            gl.setClearColor('#000000');
          }}
        >
          <Suspense fallback={<Loader />}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Spaceship />
            <Stars 
              radius={100}
              depth={50}
              count={1000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default Experience;
