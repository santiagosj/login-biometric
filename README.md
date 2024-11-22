sudo docker-compose up --build

------------------------------
redis-cli:
redis-cli -h localhost -p 6379
AUTH my-super-secret-pass
------------------------------
### Redis utils:

| **Comando**              | **Descripción**                                                                 |
|---------------------------|---------------------------------------------------------------------------------|
| `AUTH <password>`         | Autenticar con la base de datos Redis.                                          |
| `KEYS *`                  | Listar todas las claves en la base de datos activa (no eficiente en bases grandes). |
| `SCAN 0`                  | Escanear claves de manera incremental y eficiente.                              |
| `SELECT <db_number>`      | Cambiar a una base de datos específica (por defecto hay 16 bases, numeradas del 0 al 15). |
| `TYPE <key>`              | Ver el tipo de dato asociado a una clave (`string`, `hash`, `list`, etc.).       |
| `HGETALL <key>`           | Obtener todos los campos y valores de un hash.                                  |
| `GET <key>`               | Obtener el valor de una clave tipo `string`.                                    |
| `LRANGE <key> 0 -1`       | Listar todos los elementos de una lista.                                        |
| `SMEMBERS <key>`          | Listar todos los elementos de un set.                                           |
| `ZRANGE <key> 0 -1`       | Listar todos los elementos de un sorted set.                                    |
| `INFO`                    | Ver estadísticas generales del servidor Redis.                                  |
| `KEYS user:*`             | Listar todas las claves que sigan el patrón `user:*`.                           |
| `QUIT`                    | Salir del CLI de Redis.                                                         |
