// frutas.js

// Array de frutas posibles
const frutas = ["🍎 Manzanas", "🍐 Peras", "🍊 Naranjas"];
let contenido = []; // Para almacenar frutas asignadas

// Función para asignar etiquetas y contenido a las cajas
function asignarFrutas() {
	const etiquetas = [...frutas];
	contenido = [...frutas];

	// Mezclar etiquetas y contenido aleatoriamente
	etiquetas.sort(() => Math.random() - 0.5);
	contenido.sort(() => Math.random() - 0.5);

	// Evitar coincidencias
	for (let i = 0; i < etiquetas.length; i++) {
		if (etiquetas[i] === contenido[i]) {
			const temp = contenido[i];
			contenido[i] = contenido[(i + 1) % contenido.length];
			contenido[(i + 1) % contenido.length] = temp;
		}
	}

	// Asignar etiquetas y contenido al HTML
	for (let i = 0; i < 3; i++) {
		document.getElementById(`etiqueta-caja-${i + 1}`).textContent =
			etiquetas[i];
		document.getElementById(`fruta-caja-${i + 1}`).textContent = contenido[i];
		document.getElementById(`fruta-caja-${i + 1}`).style.display = "none";

		// Agregar eventos para abrir caja
		document
			.getElementById(`abrir-caja-${i + 1}`)
			.addEventListener("click", () => abrirCaja(i + 1));
	}
}

// Función para abrir una caja
function abrirCaja(numeroCaja) {
	// Mostrar fruta y ocultar botón de abrir caja
	document.getElementById(`fruta-caja-${numeroCaja}`).style.display = "block";
	document.getElementById(`abrir-caja-${numeroCaja}`).style.display = "none";

	// Ocultar botones de abrir caja y mostrar adivinanzas en otras cajas
	for (let i = 1; i <= 3; i++) {
		if (i !== numeroCaja) {
			document.getElementById(`abrir-caja-${i}`).style.display = "none";
			document.getElementById(`adivinar-${i}`).style.display = "flex";

			// Agregar eventos a los botones de adivinar
			asignarEventosAdivinar(i);
		} else {
			document.getElementById(`adivinar-${i}`).style.display = "none";
		}
	}
}

// Función para agregar eventos a los botones de adivinar
function asignarEventosAdivinar(numeroCaja) {
	const botones = document.querySelectorAll(`#adivinar-${numeroCaja} button`);
	botones.forEach((boton) => {
		boton.addEventListener("click", () => {
			// Ocultar botones no seleccionados
			botones.forEach((btn) => {
				if (btn !== boton) btn.style.display = "none";
			});
		});
	});
}

// Ejecutar la función al cargar la página
window.onload = asignarFrutas;
