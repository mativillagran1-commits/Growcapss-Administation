let inversiones = JSON.parse(localStorage.getItem('inversiones')) || [];
let ventas = JSON.parse(localStorage.getItem('ventas')) || [];
let proveedores = JSON.parse(localStorage.getItem('proveedores')) || [];

// Mostrar secciones
function mostrarSeccion(id) {
  document.querySelectorAll('.seccion').forEach(s => s.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

// Formatear fecha
function obtenerFechaHora() {
  const ahora = new Date();
  return ahora.toLocaleString();
}

// Guardar en localStorage
function guardarDatos() {
  localStorage.setItem('inversiones', JSON.stringify(inversiones));
  localStorage.setItem('ventas', JSON.stringify(ventas));
  localStorage.setItem('proveedores', JSON.stringify(proveedores));
  actualizarSelectProveedores();
}

// ========== PROVEEDORES ==========
function agregarProveedor() {
  const nombre = document.getElementById('prov-nombre').value.trim();
  const info = document.getElementById('prov-info').value.trim();

  if (!nombre) return;
