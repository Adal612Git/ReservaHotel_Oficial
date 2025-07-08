# ReservaHotel

## Docker

Para ejecutar el proyecto con Docker:

1. Copia `reserva-hotel-backend/.env.example` a `reserva-hotel-backend/.env` y ajusta las variables si es necesario. Asegúrate de que `DATABASE_URL` contenga la cadena de conexión completa.
2. Las credenciales por defecto son `admin`/`admin` y la base de datos `reservahotel`. El servicio PostgreSQL expone el puerto `5432`.
3. Construye y levanta los contenedores:

```bash
docker-compose up --build
```

4. Para entrar al contenedor del backend:

```bash
docker-compose exec backend sh
```

El backend quedará disponible en `http://localhost:3000`.

## UI/UX Design

El diseño en Figma puede consultarse en el siguiente enlace público:
[ReservaHotel_UI](https://www.figma.com/file/PLACEHOLDER/ReservaHotel_UI)

El archivo `.fig` exportado se encuentra en `design/ReservaHotel_UI.fig`.

