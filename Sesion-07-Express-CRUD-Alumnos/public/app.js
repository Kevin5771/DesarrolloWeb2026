/**
 * app.js — Lógica del sitio (Fetch + Dialogs)
 * Tarea Sesión 7 · Desarrollo Web · UMG
 */

const API = '/alumnos';
const API_KEY = 'umg-2026';

const cabeceras = (conJson = true) => ({
    ...(conJson ? { 'Content-Type': 'application/json' } : {}),
    'x-api-key': API_KEY,
});

const tabla = document.querySelector('#tablaAlumnos tbody');
const mensaje = document.querySelector('#mensaje');
const dialogoForm = document.querySelector('#dialogoForm');
const dialogoEliminar = document.querySelector('#dialogoEliminar');
const form = document.querySelector('#formAlumno');
const tituloForm = document.querySelector('#tituloForm');
const nombreEliminar = document.querySelector('#nombreEliminar');

let idEnEdicion = null;
let idAEliminar = null;

async function cargarAlumnos() {
    try {
        const respuesta = await fetch(API);

        if (!respuesta.ok) {
            throw new Error('No se pudieron cargar los alumnos');
        }

        const alumnos = await respuesta.json();

        tabla.innerHTML = '';

        for (const alumno of alumnos) {
            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td>${alumno.id}</td>
                <td>${alumno.nombre}</td>
                <td>${alumno.apellido}</td>
                <td>${alumno.email}</td>
                <td>${alumno.edad ?? ''}</td>
                <td>
                    <button type="button" class="editar">
                        Editar
                    </button>
                    <button type="button" class="eliminar">
                        Eliminar
                    </button>
                </td>
            `;

            const btnEditar = fila.querySelector('.editar');
            const btnEliminar = fila.querySelector('.eliminar');

            btnEditar.addEventListener('click', () => {
                abrirDialogoEditar(alumno.id);
            });

            btnEliminar.addEventListener('click', () => {
                nombreEliminar.textContent =
                    `${alumno.nombre} ${alumno.apellido}`;

                eliminarAlumno(alumno.id);
            });

            tabla.appendChild(fila);
        }
    } catch (error) {
        mostrarMensaje(error.message, 'error');
    }
}

function abrirDialogoNuevo() {
    form.reset();

    idEnEdicion = null;

    tituloForm.textContent = 'Nuevo alumno';

    dialogoForm.showModal();
}

async function abrirDialogoEditar(id) {
    try {
        const respuesta = await fetch(`${API}/${id}`);

        if (!respuesta.ok) {
            throw new Error('No se pudo obtener el alumno');
        }

        const alumno = await respuesta.json();

        idEnEdicion = alumno.id;

        document.querySelector('#nombre').value =
            alumno.nombre;

        document.querySelector('#apellido').value =
            alumno.apellido;

        document.querySelector('#email').value =
            alumno.email;

        document.querySelector('#edad').value =
            alumno.edad ?? '';

        tituloForm.textContent = 'Editar alumno';

        dialogoForm.showModal();
    } catch (error) {
        mostrarMensaje(error.message, 'error');
    }
}

async function guardarAlumno(event) {
    event.preventDefault();

    const nombre = document.querySelector('#nombre').value.trim();
    const apellido = document.querySelector('#apellido').value.trim();
    const email = document.querySelector('#email').value.trim();
    const edadTexto = document.querySelector('#edad').value;

    const datos = {
        nombre,
        apellido,
        email,
    };

    if (edadTexto !== '') {
        datos.edad = Number(edadTexto);
    }

    const editando = idEnEdicion !== null;

    const url = editando
        ? `${API}/${idEnEdicion}`
        : API;

    const metodo = editando
        ? 'PUT'
        : 'POST';

    try {
        const respuesta = await fetch(url, {
            method: metodo,
            headers: cabeceras(),
            body: JSON.stringify(datos),
        });

        if (!respuesta.ok) {
            let textoError = 'No se pudo guardar el alumno';

            try {
                const datosError = await respuesta.json();

                if (datosError.error) {
                    textoError = datosError.error;
                }
            } catch {
                // se mantiene el mensaje por defecto
            }

            throw new Error(textoError);
        }

        dialogoForm.close();

        mostrarMensaje(
            editando
                ? 'Alumno actualizado correctamente'
                : 'Alumno creado correctamente'
        );

        idEnEdicion = null;

        await cargarAlumnos();
    } catch (error) {
        mostrarMensaje(error.message, 'error');
    }
}

function eliminarAlumno(id) {
    idAEliminar = id;

    dialogoEliminar.showModal();
}

function mostrarMensaje(texto, tipo = 'ok') {
    mensaje.textContent = texto;
    mensaje.className = tipo;
}

document.addEventListener('DOMContentLoaded', () => {
    const btnNuevo = document.querySelector('#btnNuevo');
    const btnCancelar = document.querySelector('#btnCancelar');
    const btnCancelarEliminar =
        document.querySelector('#btnCancelarEliminar');
    const btnConfirmarEliminar =
        document.querySelector('#btnConfirmarEliminar');

    btnNuevo.addEventListener('click', abrirDialogoNuevo);

    form.addEventListener('submit', guardarAlumno);

    btnCancelar.addEventListener('click', () => {
        dialogoForm.close();
    });

    btnCancelarEliminar.addEventListener('click', () => {
        dialogoEliminar.close();
        idAEliminar = null;
    });

    btnConfirmarEliminar.addEventListener(
        'click',
        async () => {
            if (!idAEliminar) {
                return;
            }

            try {
                const respuesta = await fetch(
                    `${API}/${idAEliminar}`,
                    {
                        method: 'DELETE',
                        headers: cabeceras(false),
                    }
                );

                if (!respuesta.ok) {
                    let textoError =
                        'No se pudo eliminar el alumno';

                    try {
                        const datosError =
                            await respuesta.json();

                        if (datosError.error) {
                            textoError = datosError.error;
                        }
                    } catch {
                        // se mantiene el mensaje por defecto
                    }

                    throw new Error(textoError);
                }

                dialogoEliminar.close();

                mostrarMensaje(
                    'Alumno eliminado correctamente'
                );

                idAEliminar = null;

                await cargarAlumnos();
            } catch (error) {
                mostrarMensaje(error.message, 'error');
            }
        }
    );

    cargarAlumnos();
});