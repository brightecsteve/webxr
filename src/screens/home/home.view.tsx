import React, { Suspense } from 'react'
import { HomeViewContainer, XrContainer } from './home.styled'
import { Canvas, useFrame } from '@react-three/fiber'
import { SoftShadows } from '@react-three/drei'
import { EffectComposer, TiltShift2 } from '@react-three/postprocessing'
import { Model } from '../../components/model/Model.view'
import { VRButton } from '@react-three/xr'

export const HomeView = () => {
    return (
        <HomeViewContainer>
            <VRButton />
            <XrContainer>
                <Canvas shadows gl={{ antialias: false }} camera={{ position: [0, 0, 0], fov: 100 }}>
                <ambientLight intensity={0.1} />
                {/* <fog attach="fog" args={["#f0f0f0", 0, 20]} /> */}
                <directionalLight intensity={2} position={[-5, 5, 5]} castShadow shadow-mapSize={2048} shadow-bias={-0.0001} />

                <mesh rotation={[-0.5 * Math.PI, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
                    <boxGeometry args={[10, 10, 1, 1]} />
                    <shadowMaterial transparent opacity={0.75}/>
                    <meshStandardMaterial color={"cyan"} />
                </mesh>
                <SoftShadows size={40} samples={16} />
                <EffectComposer multisampling={4}>
                    <TiltShift2 blur={0.2} />
                </EffectComposer>
                <Suspense>
                    <group scale={[1, 1, 1]} rotation={[0, 0, 0]} position={[0, 0, -1]} >
                        <Model url={"./penguin.stl"} direction={0} />
                    </group>
                </Suspense>
                </Canvas>
            </XrContainer>
        </HomeViewContainer>
    )
}