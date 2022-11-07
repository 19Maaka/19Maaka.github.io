const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );
var x = 0;
var y = 0;

const scene = new THREE.Scene();

const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );

const geometry = new THREE.BufferGeometry().setFromPoints( points );

const line = new THREE.Line( geometry, material );

scene.add( line );

document.addEventListener("keydown", moveCamera, false);
function moveCamera(event){
    var keyCode = event.which;
    switch (keyCode){
        case 37:
            x--;
            break;
        case 38:
            y++;
            break;
        case 39:
            x++;	
            break;
    }
    console.log(x);
    camera.position.set( x, y, 100 );
};

function animate(){
    requestAnimationFrame(animate);
    renderer.render( scene, camera );
};

animate();