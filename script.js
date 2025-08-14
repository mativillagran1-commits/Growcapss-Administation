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

  proveedores.push({ nombre, info });
  guardarDatos();
  mostrarProveedores();
  document.getElementById('prov-nombre').value = '';
  document.getElementById('prov-info').value = '';
}

// Mostrar proveedores en select
function actualizarSelectProveedores() {
  const select = document.getElementById('inversion-proveedor');
  if (!select) return;
  select.innerHTML = '<option value="">Seleccionar proveedor</option>';
  proveedores.forEach((p, i) => {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = p.nombre;
    select.appendChild(option);
  });
}

// ========== INVERSIONES ==========
function agregarInversion() {
  const producto = document.getElementById('inversion-producto').value;
  const monto = parseFloat(document.getElementById('inversion-monto').value);
  const stock = parseInt(document.getElementById('inversion-stock').value);
  const proveedorIndex = document.getElementById('inversion-proveedor').value;
  const detalle = document.getElementById('inversion-detalle').value;

  if (!producto || !monto || !stock || proveedorIndex === "") return;

  const inversion = {
    fecha: obtenerFechaHora(),
    producto,
    monto,
    stock,
    proveedor: proveedores[proveedorIndex].nombre,
    detalle
  };

  inversiones.push(inversion);
  guardarDatos();
  mostrarInversiones();

  // Limpiar formulario
  document.getElementById('form-inversiones').reset();
}

// Mostrar inversiones en la lista
function mostrarInversiones() {
  const lista = document.getElementById('lista-inversiones');
  lista.innerHTML = '';
  inversiones.forEach((inv, i) => {
    const li = document.createElement('li');
    li.textContent = `${inv.fecha} - ${inv.producto} - $${inv.monto} - Stock: ${inv.stock} - Proveedor: ${inv.proveedor} - Detalle: ${inv.detalle}`;
    lista.appendChild(li);
  });
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  mostrarSeccion('inversiones');
  actualizarSelectProveedores();
  mostrarInversiones();
});
