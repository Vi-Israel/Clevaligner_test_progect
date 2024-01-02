import * as THREE from 'three';

import { useEffect, useRef } from "react";
import {RoomEnvironment} from "three/examples/jsm/environments/RoomEnvironment";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GUI} from "three/examples/jsm/libs/lil-gui.module.min";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

function Three() {
  const refContainer = useRef(null);
  let upJaw, lowJaw;
  let changeColor={changeColor:false}

  useEffect(() => {
    // === THREE.JS CODE START ===
    let camera, scene, renderer, controls;
    let upJawPosition=1;
     scene = new THREE.Scene();
    const gui = new GUI();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 20 );
    camera.position.set(-0.75, 0.7, 100.25 );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    refContainer.current && refContainer.current.appendChild( renderer.domElement );

    new GLTFLoader()
        .setPath( './LowerJaw/' )
        .load( 'lower-jaw-vertical.glb', function ( gltf ) {
          lowJaw=gltf.scene;
          scene.add( lowJaw );
          console.log(lowJaw);
          lowJaw.scale.set(0.1,0.1,0.1);
          lowJaw.rotation.set(-3.1416/2,0,3.1416);




        } );

    const environment = new RoomEnvironment( renderer );
    const pmremGenerator = new THREE.PMREMGenerator( renderer );

    scene.background = new THREE.Color( 0xbbbbbb );
    scene.environment = pmremGenerator.fromScene( environment ).texture;

    controls = new OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true;
    controls.minDistance = 1;
    controls.maxDistance = 10;
    controls.target.set( 0, 0.35, 0 );
    controls.update();

    window.addEventListener( 'resize', onWindowResize );

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function animate() {

      requestAnimationFrame( animate );

      controls.update(); // required if damping enabled

      render();
    }

    function render() {

      renderer.render( scene, camera );
    }


    animate();
  }, []);
  return (
    <div ref={refContainer}></div>
    
  );
}

export default Three