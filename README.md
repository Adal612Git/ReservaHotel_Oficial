# ReservaHotel

## Docker

Para ejecutar el proyecto con Docker:

1. Copia `reserva-hotel-backend/.env.example` a `reserva-hotel-backend/.env` y ajusta las variables si es necesario. Asegúrate de que `DATABASE_URL` contenga la cadena de conexión completa.
2. Construye y levanta los contenedores:

```bash
docker-compose up --build
```

3. Para entrar al contenedor del backend:

```bash
docker-compose exec backend sh
```

El backend quedará disponible en `http://localhost:3000`.
