// frutas.js

// Array de frutas posibles
const frutas = ["🍎 Manzanas", "🍐 Peras", "🍊 Naranjas"];
let contenido = []; // Para almacenar frutas asignadas
let respuestas = {}; // Para almacenar respuestas del jugador

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

	// Mostrar adivinanzas en otras cajas
	for (let i = 1; i <= 3; i++) {
		if (i !== numeroCaja) {
			document.getElementById(`abrir-caja-${i}`).style.display = "none";
			document.getElementById(`adivinar-${i}`).style.display = "flex";
			asignarEventosAdivinar(i);
		} else {
			document.getElementById(`adivinar-${i}`).style.display = "none";
		}
	}
}

// Función para asignar eventos a botones de adivinanza
function asignarEventosAdivinar(numeroCaja) {
	const botones = document.querySelectorAll(`#adivinar-${numeroCaja} button`);
	botones.forEach((boton) => {
		boton.addEventListener("click", () => {
			// Guardar respuesta del jugador
			respuestas[`caja-${numeroCaja}`] = boton.textContent;

			// Mostrar solo la fruta seleccionada
			botones.forEach((btn) => {
				if (btn !== boton) btn.style.display = "none";
			});

			// Comprobar si ambas respuestas están seleccionadas
			if (Object.keys(respuestas).length === 2) {
				verificarRespuestas();
			}
		});
	});
}

// Función para verificar respuestas
function verificarRespuestas() {
	let aciertos = 0;
	for (let i = 1; i <= 3; i++) {
		if (respuestas[`caja-${i}`] === contenido[i - 1]) {
			aciertos++;
		}
	}

	// Mostrar resultado y recargar la página
	if (aciertos === 2) {
		alert("¡Felicidades! Adivinaste correctamente ambas cajas.");
	} else {
		alert("¡Incorrecto! Vuelve a intentarlo.");
	}

	// Recargar la página
	location.reload();
}

// Ejecutar la función al cargar la página
window.onload = asignarFrutas;
