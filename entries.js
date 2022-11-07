var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 0, 0, 5 );
camera.lookAt( 0, 0, 0 );

var scene = new THREE.Scene();

var texture = new THREE.TextureLoader().load('https://github.com/19Maaka/19Maaka.github.io/blob/main/cat.jpg');
var material = new THREE.MeshBasicMaterial( { map: texture } );

var geometry = new THREE.PlaneGeometry(10, 10*.75);
var mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0,0,0)
scene.add(mesh);

var light = new THREE.PointLight(0xffffff,1,0);
light.position.set(1,1,100);
scene.add(light);

function animate(){
    requestAnimationFrame(animate);
    renderer.render( scene, camera );
}

animate();