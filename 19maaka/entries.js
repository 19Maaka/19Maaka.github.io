import * as THREE from 'three';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader';

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 0, 0, 5 );
camera.lookAt( 0, 0, 0 );

var scene = new THREE.Scene();

var texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/19Maaka/19Maaka.github.io/main/asset/entries-1.png');
var material = new THREE.MeshBasicMaterial( { map: texture } );

var geometry = new THREE.PlaneGeometry(10, 10*.75);
var mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0,0,0)
scene.add(mesh);

var light = new THREE.PointLight(0xffffff,1,0);
light.position.set(1,1,100);
scene.add(light);

var parent = new THREE.Group();
scene.add( parent );

var mtlLoader = new MTLLoader();
var url = './asset/nameLogo.mtl';
mtlLoader.load( url, function( materials ) {

    materials.preload();

    var objLoader = new OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.load( './asset/nameLogo.obj', function ( object ) {
        parent.add( object );
        object.position.x = -3;
        object.position.z = 1;
        object.scale.set(0.7,0.7,0.7)
    });

});

var parent2 = new THREE.Group();
scene.add( parent2 );
var newmtlLoader = new MTLLoader();
var newurl = './asset/go.mtl';
newmtlLoader.load( newurl, function( materials ) {

    materials.preload();

    var newobjLoader = new OBJLoader();
    newobjLoader.setMaterials( materials );
    newobjLoader.load( './asset/go.obj', function ( object ) {
        parent2.add( object );
        object.position.x = -5;
        object.position.z = 1;
        object.scale.set(0.7,0.7,0.7)
    });

});

window.addEventListener("resize", setCanvasDimensions);
function setCanvasDimensions(){
    console.log("1");
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    const ratio = window.devicePixelRatio;
    renderer.domElement.width = window.innerWidth * ratio;
    renderer.domElement.height = window.innerHeight * ratio;
    renderer.domElement.style.width = `${window.innerWidth}px`;
    renderer.domElement.style.height = `${window.innerHeight}px`;
};

var x = 0;
var y = 0;
var z = 0;
document.addEventListener("keydown", moveCamera, false);
function moveCamera(event){
    var keyCode = event.which;
    switch (keyCode){
        case 37:
            x--;
            break;
        case 39:
            x++;
            break;
        case 40:
            y--;	
            break;
        case 38:
            y++;
            break;
        case 90:
            z--;
            break;
        case 88:
            z++;	
            break;
    }
    //camera.position.set( x, y, z );
};

var x = 0;
function animate(){
    requestAnimationFrame(animate);
    x+=0.01;
    console.log(Math.sin(x));
    parent.rotation.y = Math.cos(x)/10;
    parent.rotation.x = Math.cos(x)/10;
    parent.rotation.z = Math.sin(x)/10;
    renderer.render( scene, camera );
}

animate();