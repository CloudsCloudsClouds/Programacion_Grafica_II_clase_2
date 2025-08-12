// Escena, cámara y renderizador
const escena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

var rotate = true;

const renderizador = new THREE.WebGLRenderer();
renderizador.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderizador.domElement);

// Crear un cubo
const geometría = new THREE.SphereGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x2030aa,
  wireframe: true,
});

const cubo = new THREE.Mesh(geometría, material);
const cubo2 = new THREE.Mesh(geometría, material);
const cubo3 = new THREE.Mesh(new THREE.ConeGeometry(), material);

escena.add(cubo);
cubo2.position.y = 2; // Move cubo2 above cubo
cubo3.position.x = 2;
escena.add(cubo2);
escena.add(cubo3);

// Posicionar la cámara
camara.position.z = 5;

// Animación del cubo
function animacion() {
  requestAnimationFrame(animacion);
  cubo.rotation.x += 0.01;
  cubo.rotation.y += 0.01;
  cubo2.rotation.x += 0.02;
  cubo2.rotation.y += 0.02;
  cubo3.rotation.x += 0.01;
  cubo3.rotation.z += 0.01;
  renderizador.render(escena, camara);
}

if (rotate) {
  animacion();
}

// Ajustar el tamaño de la ventana al cambiar su tamaño
window.addEventListener("resize", () => {
  camara.aspect = window.innerWidth / window.innerHeight;
  camara.updateProjectionMatrix();
  renderizador.setSize(window.innerWidth, window.innerHeight);
});

document.getElementById("ToggleWireframe").addEventListener("click", () => {
  material.wireframe = !material.wireframe;
});

document.getElementById("ToggleRotation").addEventListener("click", () => {
  rotate = !rotate;
  animacion();
});

document.getElementById("Randomize").addEventListener("click", () => {
  function randomFloatInRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  cubo.position.x = randomFloatInRange(-3, 3);
  cubo.position.y = randomFloatInRange(-3, 3);
  cubo.position.z = randomFloatInRange(-3, 3);

  cubo2.position.x = randomFloatInRange(-3, 3);
  cubo2.position.y = randomFloatInRange(-3, 3);
  cubo2.position.z = randomFloatInRange(-3, 3);

  cubo3.position.x = randomFloatInRange(-3, 3);
  cubo3.position.y = randomFloatInRange(-3, 3);
  cubo3.position.z = randomFloatInRange(-3, 3);
});
