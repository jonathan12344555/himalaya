
// Three.js 3D Himalaya mit Zeitleiste
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, document.getElementById('3d-container').clientWidth / 500, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(document.getElementById('3d-container').clientWidth, 500);
document.getElementById('3d-container').appendChild(renderer.domElement);

// Platten
const plateMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, opacity: 0.7, transparent: true });
const indiaPlate = new THREE.Mesh(new THREE.BoxGeometry(10, 0.5, 10), plateMaterial);
const eurasiaPlate = new THREE.Mesh(new THREE.BoxGeometry(10, 0.5, 10), plateMaterial);
indiaPlate.position.x = -15;
eurasiaPlate.position.x = 0;
scene.add(indiaPlate);
scene.add(eurasiaPlate);

// Himalaya Berg
const mountainMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
const mountain = new THREE.Mesh(new THREE.ConeGeometry(1, 1, 32), mountainMaterial);
mountain.position.x = 0;
mountain.position.y = 0.25;
scene.add(mountain);

// Licht
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 20, 10);
scene.add(light);

camera.position.z = 25;
camera.position.y = 10;
camera.lookAt(0,0,0);

let time = 0; // Millionen Jahre
let maxTime = 50; // 50 Mio Jahre

function animate() {
    requestAnimationFrame(animate);
    let progress = time / maxTime;
    indiaPlate.position.x = -15 + 15 * progress;
    mountain.scale.y = progress * 10;
    mountain.position.y = mountain.scale.y / 2;
    renderer.render(scene, camera);
    time += 0.05;
    if(time > maxTime) time = maxTime;
}
animate();

// Zeitleisten-Slider
const slider = document.createElement('input');
slider.type = 'range';
slider.min = 0;
slider.max = maxTime;
slider.value = 0;
slider.step = 0.1;
slider.style.width = '80%';
slider.oninput = function() { time = parseFloat(this.value); };
document.getElementById('3d-container').appendChild(slider);
