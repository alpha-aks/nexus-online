import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stats } from '@react-three/drei';
import { Suspense } from 'react';
import ModelLoader from './ModelLoader';

function TestCube() {
  return (
    <div style={{ width: '100%', height: '100vh', background: 'black' }}>
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <ModelLoader />
          <OrbitControls />
          <Stats />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default TestCube;
