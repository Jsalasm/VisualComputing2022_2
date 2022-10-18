var boxArray = [];
var group;
var camera, scene, renderer, webGlCanvas;
var ball, ruler, light;
const thickness = 0.1;

function initialize() {
	scene = new THREE.Scene();

	camera = new THREE.OrthographicCamera(
		10 / -2,
		10 / 2,
		10 / 2,
		10 / -2,
		1,
		150
	);
	camera.position.z = 10;

	webGlCanvas = document.getElementById("webGlDiv");
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(700, 700);
	webGlCanvas.appendChild(renderer.domElement);

	initBoxes();

	group = new THREE.Group();

	for (var i = 0; i < boxArray.length; i++) {
		group.add(boxArray[i]);
	}

	scene.add(group);
	createBall();
	createRuler();
	initButtons();
	animate();
}

function initBoxes() {
	const thickness = 0.1;
	const texture = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

	const box1 = new THREE.BoxGeometry(6, thickness * 2, thickness * 5);
	const box2 = new THREE.BoxGeometry(6, thickness * 2, thickness * 5);
	const box3 = new THREE.BoxGeometry(thickness * 2, 1.7, thickness * 5);
	const box4 = new THREE.BoxGeometry(thickness * 2, 3.79, thickness * 5);
	const box5 = new THREE.BoxGeometry(5.8, thickness * 2, thickness * 5);
	const box6 = new THREE.BoxGeometry(2.2, thickness * 2, thickness * 5);
	const box7 = new THREE.BoxGeometry(2.9, thickness * 2, thickness * 5);

	const cube = new THREE.Mesh(box1, texture);
	const cube2 = new THREE.Mesh(box2, texture);
	const cube3 = new THREE.Mesh(box3, texture);
	const cube4 = new THREE.Mesh(box4, texture);
	const cube5 = new THREE.Mesh(box5, texture);
	const cube6 = new THREE.Mesh(box6, texture);
	const cube7 = new THREE.Mesh(box7, texture);

	cube.position.set(0, 1.3, 0);
	cube2.position.set(0, -1.3, 0);
	cube3.position.set(-2.88, 0, 0);
	cube4.position.set(2.87, 0, 0);
	cube5.position.set(0, 0, 0);
	cube6.position.set(-1.3, 0, 0);
	cube7.position.set(0.7, 0, 0);

	cube6.rotation.z = (Math.PI * 1) / 2;
	cube7.rotation.z = (Math.PI * 1) / 2;
	cube.rotation.z = 0.175;
	cube2.rotation.z = -0.175;

	boxArray.push(cube);
	boxArray.push(cube2);
	boxArray.push(cube3);
	boxArray.push(cube4);
	boxArray.push(cube5);
	boxArray.push(cube6);
	boxArray.push(cube7);
}

function animate() {
	requestAnimationFrame(animate);
	group.rotation.y += 0.02;
	ruler.rotation.y += 0.02;
	ball.rotation.y += 0.02;
	renderer.render(scene, camera);
}

function createBall() {
	ball = new THREE.SphereGeometry(thickness * 4, 32, 32);
	const ballMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });

	ball = new THREE.Mesh(ball, ballMaterial);
	ball.position.set(-3.2, 1, 0);
    ball.visible = false;
	group.add(ball);
}

function createRuler() {
	box = new THREE.BoxGeometry(5, thickness, thickness * 3);
	const rulerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

	ruler = new THREE.Mesh(box, rulerMaterial);

	ruler.position.set(0, 0.3, 0);
	ruler.rotation.y = Math.PI / 2;
	ruler.rotation.z = Math.PI / 9;
    ruler.visible = false;
	scene.add(ruler);
}

function initButtons() {
	document.getElementById("ball").addEventListener("click", function () {
		ball.visible = !ball.visible;
	});
	document.getElementById("ruler").addEventListener("click", function () {
		ruler.visible = !ruler.visible;
	});
}

initialize();
