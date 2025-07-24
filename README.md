# SpeechDown

Aplicación web fullstack para terapia de lenguaje asistida por IA, diseñada para niños con Síndrome de Down, sus familias y terapeutas. Incluye backend Flask + PostgreSQL y frontend React + Tailwind, con endpoints REST, autenticación, roles, generación de ejercicios IA y síntesis de voz (TTS).

---

## Características principales

- **Autenticación y roles:**
  - Login y logout con sesiones.
  - Roles: superadmin, admin, padre, terapeuta, niño.
  - Superadmin puede gestionar usuarios y todo el sistema.
- **Gestión de usuarios y perfiles:**
  - CRUD de usuarios (admin/superadmin).
  - Padres/terapeutas pueden registrar niños asociados a su cuenta.
  - Un padre/terapeuta puede tener varios niños; un niño solo un padre/terapeuta.
- **Gestión de niños, sesiones y progreso:**
  - Registro de niños, sesiones/actividades y progreso.
  - Todo enlazado a los usuarios y niños correspondientes.
- **Paneles y navegación:**
  - Sidebar con navegación por secciones y lista de niños seleccionable.
  - Paneles adaptados según el rol.
  - Logout visible y accesible.
- **IA y TTS:**
  - Generación de ejercicios personalizados con IA (OpenRouter/Gemini).
  - Síntesis de voz real con Bark (transformers).
  - Botón para escuchar ejercicios generados.
- **Historial y progreso:**
  - Cada ejercicio IA generado se guarda automáticamente como sesión e incrementa el progreso.
  - Paneles para consultar historial y progreso por niño.
- **Frontend moderno:**
  - React + Tailwind, UI accesible y colorida.
  - Axios para llamadas API, manejo de errores y feedback visual.
- **Backend robusto:**
  - Flask, SQLAlchemy, PostgreSQL, Blueprints.
  - Endpoints RESTful para usuarios, niños, sesiones, progreso, IA y TTS.
  - Proxy para desarrollo local (`setupProxy.js`).

---

## Instalación y ejecución

### Requisitos
- Python 3.10+
- Node.js 18+
- PostgreSQL

### Backend
1. Clona el repositorio y entra a la carpeta `backend`.
2. Crea y activa un entorno virtual:
   ```sh
   python -m venv .venv
   .venv\Scripts\activate  # Windows
   ```
3. Instala dependencias:
   ```sh
   pip install -r requirements.txt
   ```
4. Configura las variables de entorno en `.env` (ver ejemplo `.env.example`).
5. Crea la base de datos y las tablas:
   ```sh
   python recreate_tables.py
   python create_superuser.py
   ```
6. Ejecuta el backend:
   ```sh
   python run.py
   ```

### Frontend
1. En otra terminal, entra a la carpeta `frontend`.
2. Instala dependencias:
   ```sh
   npm install
   ```
3. Ejecuta el frontend:
   ```sh
   npm start
   ```
4. Accede a `http://localhost:3000`

---

## Estructura de carpetas

```
speechdown-app/
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── config.py
│   │   └── ...
│   ├── run.py
│   ├── recreate_tables.py
│   └── create_superuser.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── ...
│   ├── setupProxy.js
│   └── ...
└── README.md
```

---

## Endpoints principales

### Autenticación y usuarios
- `POST /api/login` — Login de usuario
- `POST /api/logout` — Logout
- `GET /api/users` — Listar usuarios
- `POST /api/users` — Crear usuario

### Niños, sesiones y progreso
- `GET /api/children` — Listar niños
- `POST /api/children` — Crear niño
- `GET /api/sessions` — Listar sesiones
- `POST /api/sessions` — Crear sesión
- `GET /api/progress` — Listar progreso
- `POST /api/progress` — Crear progreso

### IA y TTS
- `POST /api/ai/generate-exercise` — Generar ejercicio IA
- `POST /api/ai/speech` — Síntesis de voz Bark (audio base64)

---

## Flujo de uso

1. **Login:** Ingresa como superadmin, admin, padre, terapeuta o niño.
2. **Gestión:**
   - Superadmin/admin: gestiona usuarios, niños, sesiones y progreso.
   - Padre/terapeuta: registra niños, selecciona uno en el sidebar y gestiona sus actividades.
   - Niño: accede a ejercicios IA, progreso y recursos.
3. **Ejercicios IA:**
   - Selecciona un niño en el sidebar.
   - Ve a "Ejercicios IA" y genera un ejercicio.
   - Escucha el ejercicio con el botón de audio.
   - El historial y progreso se guardan automáticamente.
4. **Consulta:**
   - Ve a "Sesiones" o "Progreso" para ver el historial y avance del niño seleccionado.

---

## Notas técnicas
- Las contraseñas se almacenan en texto plano solo para pruebas (no usar así en producción).
- El TTS Bark requiere dependencias de audio (`soundfile`, `numpy`).
- El proxy (`setupProxy.js`) permite que el frontend use `/api` para todas las llamadas.
- El backend puede simular IA/TTS si no hay API keys configuradas.

---

## Créditos y licencias
- Desarrollado por [tu equipo/nombre].
- Basado en Flask, React, Tailwind, HuggingFace Transformers, PostgreSQL.
- Para uso educativo y terapéutico.
# speechdownjr
