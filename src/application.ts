import * as THREE from 'three';

let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let mesh: THREE.Mesh;

function init() {
	camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 1, 3500);
    camera.position.z = 2750;

	renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
	renderer.setClearColor(0x000000, 0);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	const container = document.getElementById('container');
	if (container != null) {
		container.appendChild(renderer.domElement);
	}

	var light1 = new THREE.DirectionalLight(0xFFFFFF, 0.5);
	light1.position.set(1, 1, 1);

	var light2 = new THREE.DirectionalLight(0xFFFFFF, 1.5);
	light2.position.set(0, -1, 0);

	var material = new THREE.MeshPhongMaterial({
		color: 0xFFFFFF,
		specular: 0xFFFFFF,
		shininess: 250,
		side: THREE.DoubleSide
	});

	var geometry = new THREE.BoxBufferGeometry(500, 500, 500);
	mesh = new THREE.Mesh(geometry, material);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x505050);
	scene.fog = new THREE.Fog(0x050505, 2000, 3500);
	scene.add(new THREE.AmbientLight(0x444444));
	scene.add(light1);
	scene.add(light2);
	scene.add(mesh);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	requestAnimationFrame(animate);

	mesh.rotation.x += 0.005;
	mesh.rotation.y += 0.01;

	renderer.render(scene, camera);
}

init();
animate();
