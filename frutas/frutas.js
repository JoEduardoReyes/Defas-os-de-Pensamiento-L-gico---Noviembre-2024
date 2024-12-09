// frutas.js

// Array de frutas posibles
const frutas = ["🍎 Manzanas", "🍐 Peras", "🍊 Naranjas"];

// Función para asignar etiquetas y contenido a las cajas
function asignarFrutas() {
	const etiquetas = [...frutas];
	const contenido = [...frutas];

	// Mezclar las etiquetas y el contenido de manera aleatoria
	etiquetas.sort(() => Math.random() - 0.5);
	contenido.sort(() => Math.random() - 0.5);

	// Evitar coincidencias entre etiquetas y contenido
	for (let i = 0; i < etiquetas.length; i++) {
		if (etiquetas[i] === contenido[i]) {
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

		// Añadir el evento para abrir cada caja
		document
			.getElementById(`abrir-caja-${i + 1}`)
			.addEventListener("click", () => abrirCaja(i + 1));
	}
}

// Función para abrir una caja
function abrirCaja(numeroCaja) {
	// Mostrar fruta y ocultar botón de la caja seleccionada
	document.getElementById(`fruta-caja-${numeroCaja}`).style.display = "block";
	document.getElementById(`abrir-caja-${numeroCaja}`).style.display = "none";

	// Ocultar botones de abrir caja en las otras cajas y mostrar adivinanzas
	for (let i = 1; i <= 3; i++) {
		if (i !== numeroCaja) {
			document.getElementById(`abrir-caja-${i}`).style.display = "none";
			document.getElementById(`adivinar-${i}`).style.display = "flex";
		} else {
			document.getElementById(`adivinar-${i}`).style.display = "none";
		}
	}
}

// Llamar a la función cuando cargue la página
window.onload = asignarFrutas;
