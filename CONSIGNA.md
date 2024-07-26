## Consigna 2

Descripción general: Su tarea es crear una pequeña aplicación web usando React con un backend en
Firestore.

La aplicación debería permitir a los usuarios acceder a un catálogo de autos, que
debe almacenarse en Firestore, donde el usuario tenga la posibilidad de:
    • Marcar como favorito una unidad
    • Consultar sobre la unidad
    • Agregar una unidad
    • Ver la ficha de la unidad
    • Reservar la unidad mediante alguna pasarela de pago
    • Cualquier otra interacción que te parezca necesaria también es aceptada

## Requisitos
    1. Agregar un vehículo: los usuarios (equipo de operaciones) deberían poder
    agregar una nueva unidad.

    2. Marcar como favorito: los usuarios (consumidores finales) deberían poder ver
    una lista de todas sus unidades favoritas.

    3. Consultar sobre una unidad: los usuarios deberían poder consultar con el
    equipo de operaciones sobre una unidad

    4. Eliminar / Inhabilitar unidades: el equipo de operaciones debería poder
    eliminar unidades vendidas o inhabilitar unidades reservadas.

    5. Aplicar Filtros: el usuario debe tener la posibilidad de aplicar filtros en el
    catálogo de unidades (utilizando índices desde Firestore) referidos a los autos.

    6. Persistir datos: los usuarios deben almacenarse en una base de datos de
    Firebase, asegurando que no se pierdan datos entre sesiones. El usuario debe
    loguearse en el sitio dejando sus datos personales (mediante react-hook-form o
    mediante google).

    7. Diseño responsivo: la aplicación debe ser responsiva y funcionar bien tanto en
    dispositivos móviles como de escritorio.

    8. Manejo de errores: la aplicación debe manejar los errores con elegancia y
    proporcionar comentarios significativos al usuario (por ejemplo, errores de
    validación de formularios, estado vacío de la lista de tareas pendientes). Manejar
    errores en la parte delantera y trasera.

## Tecnologías
    • Frontend: React con TypeScript
    • Gestión de formularios: react-hook-form
    • Backend: Firestore u otra tecnología en la que te sientas más cómodo
    • Biblioteca UI: Material-UI (MUI) o React Bootstrap para la interfaz de usuario
    • Estilo: CSS (opcional, también puedes usar MUI SX, SASS)