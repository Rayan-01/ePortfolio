import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// Original industrial concepts, not replicas of the portfolio's actual hardware.
const stage = document.querySelector('.robot-stage');
const canvas = document.querySelector('#robot-canvas');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
} catch {
  canvas.hidden = true;
  const fallback = document.createElement('div');
  fallback.className = 'model-fallback';
  fallback.innerHTML = '<span>ROBOTICS SYSTEMS</span><strong>Perception<br>Planning<br>Control</strong><p>Explore the robotics projects below.</p>';
  stage.append(fallback);
}

if (renderer) {
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(33, 1, .1, 40);
  camera.position.set(4.6, 3.5, 6.1);
  camera.lookAt(0, .7, 0);
  const environment = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(environment, .04);
  scene.environment = env.texture;
  environment.dispose();
  pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xc6dfec, 0x283133, 2));
  const key = new THREE.DirectionalLight(0xf0f6ff, 4);
  key.position.set(-3, 6, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = key.shadow.camera.bottom = -4;
  key.shadow.camera.right = key.shadow.camera.top = 4;
  key.shadow.normalBias = .035;
  key.shadow.bias = -.0003;
  key.shadow.radius = 4;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x97b8ce, 2.5);
  rim.position.set(4, 3, -4);
  scene.add(rim);
  const fill = new THREE.DirectionalLight(0xd6e2c0, .7);
  fill.position.set(4, 1, 4);
  scene.add(fill);

  const mat = (color, metalness = .4, roughness = .4, extra = {}) => new THREE.MeshStandardMaterial({ color, metalness, roughness, ...extra });
  const metal = mat(0x87969d, .82, .3);
  const shell = mat(0x49565e, .66, .36);
  const lightPanel = mat(0xb0babd, .65, .38);
  const graphite = mat(0x20292f, .55, .48);
  const rubber = mat(0x101417, .02, .92);
  const treadMaterial = mat(0x1a2023, .04, .85);
  const black = mat(0x091014, .15, .4);
  const steel = mat(0xa8b3b9, .94, .23);
  const lensMaterial = mat(0x112838, .85, .1, { emissive: 0x102b3b, emissiveIntensity: .25 });
  const accent = mat(0xa9c960, .45, .48);
  const led = mat(0xb3d687, .3, .3, { emissive: 0x91b65a, emissiveIntensity: .4 });

  // A restrained woven surface gives the aerial platform a different material identity.
  const weave = document.createElement('canvas');
  weave.width = weave.height = 64;
  const wc = weave.getContext('2d');
  wc.fillStyle = '#252c31'; wc.fillRect(0, 0, 64, 64);
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
    wc.fillStyle = (x + y) % 2 ? '#30383d' : '#1c242a';
    wc.fillRect(x * 8, y * 8, 7, 7);
    wc.fillStyle = '#465057';
    if ((x + y) % 2) wc.fillRect(x * 8 + 1, y * 8 + 2, 5, 1);
    else wc.fillRect(x * 8 + 2, y * 8 + 1, 1, 5);
  }
  const weaveTexture = new THREE.CanvasTexture(weave);
  weaveTexture.colorSpace = THREE.SRGBColorSpace;
  weaveTexture.wrapS = weaveTexture.wrapT = THREE.RepeatWrapping;
  weaveTexture.repeat.set(4, 4);
  const carbon = mat(0x87949d, .4, .48, { map: weaveTexture });
  const carbonBlade = mat(0x27323a, .45, .38, { side: THREE.DoubleSide });

  function mesh(geometry, material, parent, position = [0, 0, 0]) {
    const object = new THREE.Mesh(geometry, material);
    object.position.set(...position);
    object.castShadow = object.receiveShadow = true;
    parent.add(object);
    return object;
  }
  function box(parent, dims, position, material = shell, radius = .035) {
    return mesh(new RoundedBoxGeometry(...dims, 2, Math.min(radius, ...dims.map(v => v / 3))), material, parent, position);
  }
  function cylinder(parent, radius, length, position, material = metal, axis = 'y', segments = 24) {
    const o = mesh(new THREE.CylinderGeometry(radius, radius, length, segments), material, parent, position);
    if (axis === 'x') o.rotation.z = Math.PI / 2;
    if (axis === 'z') o.rotation.x = Math.PI / 2;
    return o;
  }
  function rod(parent, a, b, radius, material = graphite) {
    const start = new THREE.Vector3(...a), end = new THREE.Vector3(...b), direction = end.clone().sub(start);
    const o = cylinder(parent, radius, direction.length(), start.clone().add(end).multiplyScalar(.5).toArray(), material);
    o.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
    return o;
  }
  function bolt(parent, pos, axis = 'y', radius = .026) {
    return cylinder(parent, radius, .017, pos, steel, axis, 6);
  }
  function decal(parent, text, width, height, pos, rotation = [-Math.PI / 2, 0, 0]) {
    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = 768; textureCanvas.height = 128;
    const dc = textureCanvas.getContext('2d');
    dc.fillStyle = '#c7d3d9'; dc.font = '500 44px Consolas, monospace';
    dc.textAlign = 'center'; dc.textBaseline = 'middle'; dc.fillText(text, 384, 64);
    const texture = new THREE.CanvasTexture(textureCanvas); texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 });
    const o = mesh(new THREE.PlaneGeometry(width, height), material, parent, pos);
    o.rotation.set(...rotation); o.castShadow = false;
  }
  function optic(parent, position, radius) {
    cylinder(parent, radius * 1.2, .055, position, graphite, 'z');
    const z = position[2] + .029;
    cylinder(parent, radius, .008, [position[0], position[1], z], lensMaterial, 'z');
    const rim = mesh(new THREE.TorusGeometry(radius * 1.09, .007, 8, 24), metal, parent, [position[0], position[1], z]);
    rim.castShadow = false;
  }
  function spring(parent, a, b) {
    const start = new THREE.Vector3(...a), end = new THREE.Vector3(...b), dir = end.clone().sub(start), length = dir.length();
    const points = [];
    for (let i = 0; i <= 100; i++) {
      const t = i / 100, angle = t * Math.PI * 12;
      points.push(new THREE.Vector3(Math.cos(angle) * .055, t * length, Math.sin(angle) * .055));
    }
    const o = mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 100, .012, 5, false), steel, parent);
    o.position.copy(start); o.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    rod(parent, a, b, .019, metal);
  }

  const modelRoot = new THREE.Group(); scene.add(modelRoot);
  const rover = new THREE.Group(); modelRoot.add(rover);
  // Low-profile six-wheel ground platform with isolated suspension and a sealed payload deck.
  box(rover, [1.65, .41, 2.58], [0, .77, 0], graphite, .12);
  box(rover, [1.74, .11, 2.64], [0, 1.02, 0], metal, .045);
  box(rover, [1.48, .16, 1.89], [0, 1.145, -.12], shell, .07);
  box(rover, [1.12, .035, 1.47], [0, 1.241, -.15], lightPanel, .025);
  for (const x of [-.47, .47]) for (const z of [-.77, -.15, .47]) bolt(rover, [x, 1.266, z]);
  decal(rover, 'AUTONOMOUS GROUND SYSTEM', .94, .16, [0, 1.267, -.44]);
  for (let i = 0; i < 8; i++) box(rover, [.62, .006, .025], [0, 1.268, -.06 + i * .055], black, .002);
  for (const side of [-1, 1]) {
    box(rover, [.055, .24, 1.6], [side * .84, .76, -.09], shell, .02);
    for (let i = 0; i < 9; i++) box(rover, [.01, .12, .021], [side * .874, .78, -.66 + i * .15], black, .002);
    for (const z of [-1, 0, 1]) {
      rod(rover, [side * .72, .79, z - .14], [side * 1.05, .39, z], .065, graphite);
      rod(rover, [side * .78, .51, z + .2], [side * 1.05, .39, z], .045, metal);
      if (z !== 0) spring(rover, [side * .86, .81, z + .17], [side * 1.04, .44, z]);
      cylinder(rover, .35, .30, [side * 1.065, .365, z], rubber, 'x', 36);
      const outer = side * 1.226;
      cylinder(rover, .224, .015, [outer, .365, z], graphite, 'x', 32);
      cylinder(rover, .153, .026, [outer + side * .013, .365, z], metal, 'x', 24);
      cylinder(rover, .069, .038, [outer + side * .03, .365, z], graphite, 'x', 12);
      for (let j = 0; j < 6; j++) {
        const a = j / 6 * Math.PI * 2;
        bolt(rover, [outer + side * .032, .365 + Math.sin(a) * .115, z + Math.cos(a) * .115], 'x', .017);
      }
      const tireRing = mesh(new THREE.TorusGeometry(.285, .025, 8, 36), rubber, rover, [outer, .365, z]);
      tireRing.rotation.y = Math.PI / 2;
      const treads = new THREE.InstancedMesh(new THREE.BoxGeometry(.145, .033, .092), treadMaterial, 48);
      treads.castShadow = treads.receiveShadow = true;
      const dummy = new THREE.Object3D();
      for (let j = 0; j < 24; j++) for (let half = 0; half < 2; half++) {
        const a = j / 24 * Math.PI * 2;
        dummy.position.set(side * 1.065 + (half ? .073 : -.073), .365 + Math.cos(a) * .351, z + Math.sin(a) * .351);
        dummy.rotation.set(a, 0, half ? .18 : -.18);
        dummy.updateMatrix(); treads.setMatrixAt(j * 2 + half, dummy.matrix);
      }
      rover.add(treads);
    }
  }
  // Flush stereo bar avoids a face-like mast; lidar and positioning antenna sit on the deck.
  box(rover, [1.20, .15, .12], [0, .93, 1.32], black, .04);
  for (const x of [-.37, .37]) optic(rover, [x, .94, 1.39], .043);
  box(rover, [1.51, .13, .14], [0, .57, 1.34], graphite, .045);
  for (const x of [-.64, .64]) box(rover, [.10, .026, .009], [x, .70, 1.301], lightPanel, .008);
  cylinder(rover, .24, .055, [0, 1.28, .60], metal);
  cylinder(rover, .19, .22, [0, 1.415, .60], graphite, 'y', 40);
  cylinder(rover, .193, .022, [0, 1.41, .60], lensMaterial, 'y', 40);
  cylinder(rover, .176, .035, [0, 1.545, .60], shell, 'y', 40);
  cylinder(rover, .062, .17, [.49, 1.35, -.76], graphite);
  cylinder(rover, .13, .055, [.49, 1.458, -.76], lightPanel);
  rod(rover, [-.55, 1.19, -.87], [-.55, 1.85, -.87], .013, black);
  cylinder(rover, .023, .11, [-.55, 1.25, -.87], rubber);
  box(rover, [.27, .008, .044], [-.38, 1.271, .47], accent, .006);

  const drone = new THREE.Group(); modelRoot.add(drone);
  const propellers = [];
  const rotorDiscs = [];
  const aircraftY = 1.45;
  // Layered carbon chassis, tubular X booms, outrunner motors, and a suspended optical payload.
  box(drone, [.73, .065, 1.05], [0, aircraftY, 0], carbon, .11);
  box(drone, [.67, .065, .98], [0, aircraftY + .19, 0], carbon, .09);
  for (const x of [-.24, .24]) for (const z of [-.34, .34]) {
    cylinder(drone, .027, .16, [x, aircraftY + .095, z], metal);
    bolt(drone, [x, aircraftY + .234, z]);
  }
  box(drone, [.44, .25, .69], [0, aircraftY + .344, -.03], graphite, .055);
  for (const z of [-.25, .20]) box(drone, [.455, .017, .075], [0, aircraftY + .478, z], rubber, .006);
  decal(drone, 'AERIAL SYSTEM / 02', .40, .065, [0, aircraftY + .478, -.035]);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const x = sx * 1.25, z = sz * 1.13;
    rod(drone, [sx * .23, aircraftY + .06, sz * .28], [x, aircraftY + .06, z], .066, carbon);
    rod(drone, [sx * .32, aircraftY + .06, sz * .37], [sx * .49, aircraftY + .06, sz * .52], .079, metal);
    box(drone, [.30, .065, .31], [x, aircraftY + .082, z], graphite, .04);
    for (const dx of [-.11, .11]) bolt(drone, [x + dx, aircraftY + .12, z]);
    cylinder(drone, .118, .125, [x, aircraftY + .18, z], graphite, 'y', 32);
    cylinder(drone, .125, .034, [x, aircraftY + .128, z], metal, 'y', 32);
    cylinder(drone, .11, .025, [x, aircraftY + .25, z], shell, 'y', 32);
    for (let i = 0; i < 12; i++) {
      const a = i / 12 * Math.PI * 2;
      box(drone, [.015, .09, .018], [x + Math.cos(a) * .12, aircraftY + .183, z + Math.sin(a) * .12], metal, .002);
    }
    const rotor = new THREE.Group(); rotor.position.set(x, aircraftY + .28, z); drone.add(rotor);
    const bladeShape = new THREE.Shape();
    bladeShape.moveTo(.02, -.026); bladeShape.bezierCurveTo(.2, -.038, .46, -.082, .65, -.025);
    bladeShape.lineTo(.70, .003); bladeShape.bezierCurveTo(.55, .045, .22, .040, .02, .021); bladeShape.closePath();
    const bladeGeometry = new THREE.ExtrudeGeometry(bladeShape, { depth: .008, bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: .003, bevelThickness: .003, curveSegments: 12 });
    for (let i = 0; i < 2; i++) {
      const b = mesh(bladeGeometry, carbonBlade, rotor);
      b.rotation.set(-Math.PI / 2, 0, i * Math.PI);
    }
    cylinder(rotor, .047, .033, [0, .015, 0], steel);
    bolt(rotor, [0, .044, 0], 'y', .022);
    rotor.userData.direction = sx * sz; propellers.push(rotor);
    const disk = mesh(new THREE.CircleGeometry(.7, 48), new THREE.MeshBasicMaterial({ color: 0x95a9b4, transparent: true, opacity: .025, side: THREE.DoubleSide, depthWrite: false }), drone, [x, aircraftY + .275, z]);
    disk.rotation.x = -Math.PI / 2; disk.castShadow = disk.receiveShadow = false; rotorDiscs.push(disk);
    box(drone, [.057, .020, .014], [x, aircraftY + .09, z + sz * .16], sx === sz ? led : metal, .005);
  }
  for (const side of [-1, 1]) {
    for (const z of [-.31, .34]) rod(drone, [side * .25, aircraftY - .02, z], [side * .54, aircraftY - .86, z * 1.8], .032, carbon);
    rod(drone, [side * .54, aircraftY - .86, -.83], [side * .54, aircraftY - .86, .86], .039, graphite);
    for (const z of [-.63, .66]) cylinder(drone, .05, .16, [side * .54, aircraftY - .86, z], rubber, 'z');
  }
  cylinder(drone, .096, .13, [0, aircraftY - .10, .27], metal);
  rod(drone, [-.17, aircraftY - .16, .27], [.17, aircraftY - .16, .27], .026, graphite);
  for (const side of [-1, 1]) rod(drone, [side * .17, aircraftY - .16, .27], [side * .17, aircraftY - .40, .27], .026, graphite);
  const gimbal = mesh(new THREE.SphereGeometry(.176, 28, 20), shell, drone, [0, aircraftY - .39, .27]);
  gimbal.scale.set(1, .9, .9);
  optic(drone, [0, aircraftY - .39, .425], .088);
  rod(drone, [0, aircraftY + .24, -.4], [0, aircraftY + .63, -.4], .009, black);
  cylinder(drone, .068, .027, [0, aircraftY + .645, -.4], lightPanel);
  drone.scale.setScalar(.88);
  drone.visible = false;

  // Studio floor and a quiet reference grid: no luminous orbit or arcade-style targeting marks.
  const floor = mesh(new THREE.PlaneGeometry(9, 9), new THREE.ShadowMaterial({ color: 0x000000, opacity: .30 }), scene, [0, -.015, 0]);
  floor.rotation.x = -Math.PI / 2; floor.castShadow = false;
  const grid = new THREE.GridHelper(5.5, 22, 0x314047, 0x213037);
  grid.material.transparent = true; grid.material.opacity = .32; grid.position.y = -.022;
  scene.add(grid);
  const scan = mesh(new THREE.RingGeometry(.99, 1, 96), new THREE.MeshBasicMaterial({ color: 0xa9c960, side: THREE.DoubleSide, transparent: true, opacity: 0, depthWrite: false }), scene, [0, .01, 0]);
  scan.rotation.x = -Math.PI / 2; scan.castShadow = scan.receiveShadow = false;

  const modes = [
    { name: 'ROVER', vision: '01 / SENSOR INTEGRATION', motion: '02 / GROUND MOBILITY', alt: 'Industrial six-wheel ground robot with a low-profile metal chassis, independent suspension, rubber tyres, a flush camera bar, and deck-mounted lidar.' },
    { name: 'DRONE', vision: '01 / STABILIZED PAYLOAD', motion: '02 / AERIAL PLATFORM', alt: 'Industrial quadcopter with carbon-composite booms, four outrunner motors, swept propellers, landing skids, and a camera gimbal.' }
  ];
  let index = 0, visible = true, raf = 0, previousTime = 0, elapsed = 0, pulse = -1;
  let targetX = 0, targetY = 0, yaw = 0, pitch = 0, switchTime = performance.now(), swapTimer;
  function labels() {
    const mode = modes[index];
    stage.dataset.model = mode.name.toLowerCase();
    document.querySelector('#model-label').textContent = mode.name + ' / ENGINEERING CONCEPT';
    document.querySelector('.label-vision').textContent = mode.vision;
    document.querySelector('.label-motion').textContent = mode.motion;
    document.querySelector('#model-index').textContent = index ? '02 / 02' : '01 / 02';
    canvas.setAttribute('aria-label', mode.alt + ' Concept visualization; not a photograph of project hardware.');
  }
  function render() { renderer.render(scene, camera); }
  function resize() {
    const bounds = stage.getBoundingClientRect();
    renderer.setSize(bounds.width, bounds.height, false);
    camera.aspect = bounds.width / bounds.height;
    camera.fov = camera.aspect < .95 ? 41 : 33;
    camera.updateProjectionMatrix(); render();
  }
  function animate(now) {
    raf = 0;
    if (!visible || document.hidden || motion.matches) return;
    const dt = previousTime ? Math.min((now - previousTime) / 1000, .05) : 0;
    previousTime = now; elapsed += dt;
    yaw += (targetX * .22 - yaw) * .06; pitch += (targetY * .025 - pitch) * .06;
    modelRoot.rotation.set(pitch, yaw, 0);
    propellers.forEach(p => p.rotation.y += dt * 10 * p.userData.direction);
    if (pulse >= 0) {
      pulse += dt * .65; scan.scale.setScalar(.5 + pulse * 3.2);
      scan.material.opacity = Math.max(0, .2 * (1 - pulse));
      if (pulse > 1) { pulse = -1; scan.material.opacity = 0; }
    }
    stage.style.setProperty('--cycle', String(Math.min(1, (now - switchTime) / 4000)));
    render(); raf = requestAnimationFrame(animate);
  }
  function schedule() { if (!raf && visible && !document.hidden && !motion.matches) { previousTime = 0; raf = requestAnimationFrame(animate); } }
  function changeModel() {
    if (!visible || document.hidden) return;
    const swap = () => {
      index = 1 - index; rover.visible = index === 0; drone.visible = index === 1;
      switchTime = performance.now(); labels(); render(); canvas.style.opacity = '1';
    };
    if (motion.matches) swap();
    else { canvas.style.opacity = '0'; clearTimeout(swapTimer); swapTimer = setTimeout(swap, 180); }
  }
  setInterval(changeModel, 4000);
  stage.addEventListener('pointermove', event => {
    if (motion.matches) return;
    const r = stage.getBoundingClientRect();
    targetX = (event.clientX - r.left) / r.width * 2 - 1; targetY = (event.clientY - r.top) / r.height * 2 - 1;
  });
  stage.addEventListener('pointerleave', () => { targetX = targetY = 0; });
  canvas.addEventListener('click', () => { if (!motion.matches) pulse = 0; });
  new ResizeObserver(resize).observe(stage);
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (!visible) { cancelAnimationFrame(raf); raf = 0; } else { render(); schedule(); }
  }).observe(stage);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(raf); raf = 0; } else schedule();
  });
  motion.addEventListener('change', () => {
    rotorDiscs.forEach(d => d.visible = !motion.matches);
    if (motion.matches) { cancelAnimationFrame(raf); raf = 0; modelRoot.rotation.set(0, 0, 0); scan.material.opacity = 0; render(); }
    else schedule();
  });
  rotorDiscs.forEach(d => d.visible = !motion.matches);
  labels(); resize(); schedule();
}

// Subtle card lighting; the native cursor remains unchanged.
if (matchMedia('(pointer:fine)').matches) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('pointermove', event => {
      if (motion.matches) return;
      const r = card.getBoundingClientRect(), x = (event.clientX - r.left) / r.width, y = (event.clientY - r.top) / r.height;
      card.style.setProperty('--mx', `${x * 100}%`); card.style.setProperty('--my', `${y * 100}%`);
      card.style.transform = `perspective(1100px) rotateX(${(y - .5) * -1}deg) rotateY(${(x - .5) * 1.2}deg) translateY(-2px)`;
    });
    card.addEventListener('pointerleave', () => card.style.transform = '');
  });
}
