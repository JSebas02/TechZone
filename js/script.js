document.addEventListener("DOMContentLoaded", () => {

    // Seleccionar elementos del HTML
    const botonesCategorias =
        document.querySelectorAll(".categoria");

    const componentes =
        document.querySelectorAll(".componente");

    const buscador =
        document.querySelector("#buscador");

    const mensajeBusqueda =
        document.querySelector("#mensaje-busqueda");

    // Categoria seleccionada inicialmente
    let categoriaActual = "todos";

    // Funcion para filtrar componentes
    function filtrarComponentes() {

        const textoBusqueda =
            buscador.value.toLowerCase().trim();

        let resultados = 0;

        componentes.forEach((componente) => {

            const categoriaComponente =
                componente.dataset.categoria;

            const contenidoComponente =
                componente.textContent.toLowerCase();

            // Comprobar categoría
            const coincideCategoria =
                categoriaActual === "todos" ||
                categoriaActual === categoriaComponente;

            // Comprobar busqueda
            const coincideBusqueda =
                contenidoComponente.includes(textoBusqueda);

            // Mostrar unicamente las coincidencias
            if (coincideCategoria && coincideBusqueda) {
                componente.style.display = "";
                resultados++;
            } else {
                componente.style.display = "none";
            }

        });

        // Mensaje cuando no hay resultados
        if (resultados === 0) {
            mensajeBusqueda.textContent =
                "No se encontraron componentes.";
        } else {
            mensajeBusqueda.textContent =
                `${resultados} componente(s) encontrado(s).`;
        }
    }

    // Filtros por categoria
    botonesCategorias.forEach((boton) => {

        boton.addEventListener("click", () => {

            categoriaActual = boton.dataset.categoria;

            // Actualizar boton seleccionado
            botonesCategorias.forEach((otroBoton) => {
                otroBoton.classList.remove("activo");
                otroBoton.setAttribute("aria-pressed", "false");
            });

            boton.classList.add("activo");
            boton.setAttribute("aria-pressed", "true");

            // Aplicar filtros
            filtrarComponentes();

            // Desplazarse hacia los resultados
            document.querySelector("#componentes")
                .scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

        });

    });

    // Buscar mientras el usuario escribe
    buscador.addEventListener("input", filtrarComponentes);

    // Mostrar resultados iniciales
    filtrarComponentes();

    // Ventana de detalles
    const ventanaDetalles =
        document.querySelector("#ventana-detalles");

    const cerrarDetalles =
        document.querySelector("#cerrar-detalles");

    const detalleNombre =
        document.querySelector("#detalle-nombre");

    const detalleImagen =
        document.querySelector("#detalle-imagen");

    const detalleDescripcion =
        document.querySelector("#detalle-descripcion");

    const detalleEspecificaciones =
        document.querySelector("#detalle-especificaciones");

    // Recorrer todos los componentes
    componentes.forEach((componente) => {

        const botonDetalles =
            componente.querySelector(".boton-detalles");

        botonDetalles.addEventListener("click", () => {

            // Obtener información del componente
            const nombre =
                componente.querySelector("h3").textContent;

            const imagen =
                componente.querySelector("img");

            const descripcion =
                componente.querySelector("p").textContent;

            const especificaciones =
                componente.querySelectorAll("li");

            // Mostrar nombre, imagen y descripcion
            detalleNombre.textContent = nombre;

            detalleImagen.src = imagen.src;
            detalleImagen.alt = imagen.alt;

            detalleDescripcion.textContent =
                descripcion.trim();

            // Limpiar especificaciones anteriores
            detalleEspecificaciones.innerHTML = "";

            // Agregar especificaciones del componente
            especificaciones.forEach((especificacion) => {

                const elemento = document.createElement("li");

                elemento.textContent =
                    especificacion.textContent;

                detalleEspecificaciones.appendChild(elemento);

            });

            // Abrir ventana
            ventanaDetalles.showModal();

        });

    });

    // Cerrar ventana
    cerrarDetalles.addEventListener("click", () => {
        ventanaDetalles.close();
    });

    // Formulario de contacto
    const formulario =
        document.querySelector("#formulario-contacto");

    const respuestaFormulario =
        document.querySelector("#respuesta-formulario");

    // Detectar cuando se envia el formulario
    formulario.addEventListener("submit", (evento) => {

        // Evitar que la pagina se recargue
        evento.preventDefault();

        // Comprobar que los campos sean validos
        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        // Obtener el nombre del usuario
        const nombre =
            formulario.querySelector("#nombre").value.trim();

        // Comprobar que el nombre no esté vacío
        if (nombre === "") {
            respuestaFormulario.textContent =
                "Por favor, escribe tu nombre.";

            respuestaFormulario.style.color = "#F87171";
            return;
        }

        // Mostrar confirmacion de demostracion
        respuestaFormulario.textContent =
            `¡Gracias, ${nombre}! Tu formulario se validó correctamente. Este es un proyecto de demostración; no se ha enviado ningún mensaje.`;

        respuestaFormulario.style.color = "#4ADE80";

        // Limpiar los campos
        formulario.reset();

    });



});
