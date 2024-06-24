import { SoftShadows, useTexture } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { BufferGeometry, Group, Material, Mesh, NormalBufferAttributes, Object3DEventMap, TextureLoader, Vector3 } from "three";
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';

export const Model = ({url, direction = 0, position = new Vector3(0, 0, 0) }: { url: string, direction?: number, position?: Vector3}) => {
    const geom = useLoader(STLLoader, url);
    const textureProps = useTexture({
        map: './blue-texture.jpeg',
    })

    const ref = useRef<Group<Object3DEventMap> | null>();
    
    useFrame((state, delta) => {
        if (!ref.current) {
            return;
        }
        ref.current.rotation.y -= delta * 1;
    })

    return (
        <Suspense>
            <ambientLight color={'orange'} />
            <pointLight position={[30, 10, 50]}/>
            <group ref={newRef => ref.current = newRef}>
                <group position={[-0.61, -0.5, -0.5]}>
                    <group scale={[0.01, 0.01, 0.01]}>
                    <mesh rotation={[1, 3, 3]}>
                        <primitive object={geom} attach="geometry"/>
                        <shadowMaterial transparent opacity={0.75}/>
                        <meshStandardMaterial
                            color={'cyan'}
                        />
                    </mesh>
                    </group>
                </group>
            </group>
        </Suspense>
    );
};