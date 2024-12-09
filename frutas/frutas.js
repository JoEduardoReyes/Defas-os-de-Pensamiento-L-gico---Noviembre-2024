// frutas.js

// Array de frutas posibles
const frutas = ["🍎 Manzanas", "🍐 Peras", "🍊 Naranjas"];

// Función para asignar etiquetas y contenido a las cajas
function asignarFrutas() {
	// Crear copias de los arrays para trabajar
	const etiquetas = [...frutas];
	const contenido = [...frutas];

	// Mezclar las etiquetas y el contenido de manera aleatoria
	etiquetas.sort(() => Math.random() - 0.5);
	contenido.sort(() => Math.random() - 0.5);

	// Evitar coincidencias entre etiquetas y contenido
	for (let i = 0; i < etiquetas.length; i++) {
		if (etiquetas[i] === contenido[i]) {
			// Si coinciden, intercambiar con otra posición
			const temp = contenido[i];
			contenido[i] = contenido[(i + 1) % contenido.length];
			contenido[(i + 1) % contenido.length] = temp;
		}
	}

	// Asignar etiquetas y contenido al HTML
	for (let i = 0; i < 3; i++) {
		const etiquetaElemento = document.getElementById(`etiqueta-caja-${i + 1}`);
		const frutaElemento = document.getElementById(`fruta-caja-${i + 1}`);

		etiquetaElemento.textContent = etiquetas[i];
		frutaElemento.textContent = contenido[i];
		frutaElemento.style.display = "none"; // Ocultar las frutas inicialmente
	}
}

// Llamar a la función cuando cargue la página
window.onload = asignarFrutas;
