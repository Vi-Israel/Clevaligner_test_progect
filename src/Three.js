import * as THREE from 'three';

import { useEffect, useRef } from "react";
import {RoomEnvironment} from "three/examples/jsm/environments/RoomEnvironment";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GUI} from "three/examples/jsm/libs/lil-gui.module.min";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

function Three({fileUp,fileLow}) {
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

    refContainer.current && refContainer.current.appendChild( renderer.domElement );

    if(fileUp){
      const urlUp = URL.createObjectURL(fileUp);
      console.log(urlUp);
      new GLTFLoader().load(urlUp,function (gltf){
        upJaw=gltf.scene;
        scene.add(upJaw);
        upJaw.scale.set(0.1,0.1,0.1);
        upJaw.rotation.set(-3.14/2,3.14,3.14);
        upJaw.position.set(0,upJawPosition,0);

      })
    }
    if(fileLow) {
      const urlLow = URL.createObjectURL(fileLow);
      new GLTFLoader()
          .load(urlLow, function (gltf) {
            lowJaw = gltf.scene;
            scene.add(lowJaw);

            lowJaw.scale.set(0.1, 0.1, 0.1);
            lowJaw.rotation.set(-3.1416 / 2, 0, 3.1416);

            gui.add(lowJaw, 'visible').name('show lower Jaw')
            gui.add(lowJaw.position, 'y', -1, 1).name('upper Jaw position');
            gui.add(changeColor, 'changeColor').name("change Color").onChange(() => {
              lowJaw.children.forEach(mesh => {
                if (changeColor.changeColor) {
                  let clone = mesh.material.clone();
                  clone.color = new THREE.Color(Math.random(), Math.random(), Math.random());
                  mesh.material = clone;
                } else {
                  let clone = mesh.material.clone();
                  clone.color = new THREE.Color(1, 1, 1);
                  mesh.material = clone;
                }

              })
            })


          });
    }
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

    return ()=>refContainer.current.removeChild( renderer.domElement);
  }, [fileUp,fileLow]);
  return (
    <div ref={refContainer}></div>
    
  );
}

export default Three