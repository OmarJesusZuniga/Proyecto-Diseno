# Notas de la BD

Esto considera Fase 1 y Fase 2

## General

- La información de los profesores nunca se elimina, sólo de dan de baja para mantener la información histórica
- Debe quedar el registro de la persona que realizó modificaciones en las transacciones de un equipo

## Clases

### Asistente Administrativa

#### Puede

- Registrar nuevos ingresos
- Dar de baja (en el grupo)
- Alterar información del miembro del equipo que le corresponde según su campus o centro académico (Profesor o Estudiante?)
- Obtener el detalle de conformación del equipo de trabajo.
- Obtener la informacion de los estudiantes
- Definir un profesor Coordinador (Solo la asistente de Cartago)
- Sumistrar la información de los estudiantes matriculados en la carrera (Excel)
- Consultar el plan de trabajo completo (sin acceso a los comentarios)
- Consultar la próxima actividad a realizarse de acuerdo con el plan considerando la fecha del sistema.

### Profesor Guia

- El profesor puede ser creado por la asistente administrativa como por si solo
- Debe existir un profesor dentro del equipo que se encuentra nombrado COORDINADOR

#### Tiene

- Código conformado por las iniciales del Campus o Centro Académico seguido de un guion y un número que se determina de manera consecutiva por cada sede (No puede ser alterado)
- Nombre completo
- Correo electrónico (No pueden haber duplicados)
- Número de teléfono en la oficina con formato NNNN-NNNN [extensión NNNN]
- Teléfono celular
- Fotografía (No es obligatoria / Opcional)

#### Puede

- Obtener el detalle de conformación del equipo de trabajo. (Equipo Guia)
- Tener acceso a la lista total de estudiantes organizada tanto por orden alfabético, por número de carné o por campus.
- Modificar alguna información particular de un estudiante en específico si y sólo si pertenece a su sede.
- Generar un nuevo archivo en Excel con la información de los estudiantes de su campus o centro académico, o bien de todos los campus o centros académicos, pero cada uno de ellos separados en pestañas u hojas independientes dentro del mismo archivo.
- Registrar comentarios a una actividad del plan de trabajo.
- Replicar o contestar a un mensaje asociado a una actividad del plan de trabajo.
- Visualizar el plan de trabajo registrado por el coordinador tanto con comentarios o sin ellos.

### Profesor Guia Coordinador

Tiene todo lo anterior del profe normal.

#### Puede

- Definir plan de trabajo del periodo por semanas.
- Activar la publicación de la actividad.
- Marcar una actividad como REALIZADA.
- Cancelar una actividad.

### Estudiante

- Hay un archivo con la información básica de contacto de los estudiantes que matricularon la carrera.
  - Cada uno de los campos de información descritos vienen indicados en cada columna del archivo.

#### Tiene

- Carnet segun el formato TEC
- Nombre Completo (Formato: Apellido1 Apellido2 Nombre1 Nombre2)
- Correo electronico (@estudiantec.cr)
- número de celular
- Sede

#### Puede

Nada por ahora

### Plan de Trabajo

Un itinerario de actividades las cuales deben ser desarrolladas durante las 16 semanas lectivas del periodo.

#### Tiene

- Semana (1 - 16)
- Tipo y Nombre de Actividad
- Fecha y hora programada para la semana establecida
- Responsable o responsables de su organización, puede ser uno o N profesores.
- Cantidad de días previos para anunciar de la actividad, se establece la fecha de publicación
- Cantidad de días requeridos para realizar recordatorios, se establecen las fechas en las que se realizarán los recordatorios. No puede ser mayor a la diferencia entre la fecha en que se realiza y la fecha de la primera publicación.
- Indicación si la actividad será presencial o remota.
- Enlace de la reunión en caso de ser remota.
- Afiche en formato PDF o JPG asociado a la actividad.
- Un estado de la actividad a saber:
  - PLANEADA: En caso de estar registrada en el plan y aún no se ha comunicado.
  - NOTIFICADA: Ya fue publicada a la comunidad estudiantil de primer ingreso.
  - REALIZADA: Ya fue llevada a cabo. Al menos una evidencia:
    - Coleccion de Imagenes
    - Imagen de los participantes
    - Enlace grabación de la actividad
  - CANCELADA: La actividad debió suspenderse, en cuyo caso debe agregarse una observación y debe quedar el registro de la fecha de cancelación.
- Registro de observaciones
- Comentarios anexos que pueden provenir de cualquiera de los profesores del equipo
  - Sean responsables o no
  - Réplica o respuesta a alguno de ellos creando una cadena o historial
  - Siempre se tiene el registro del profesor emisor, fecha y hora del mensaje.