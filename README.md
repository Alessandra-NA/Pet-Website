### Construído a partir del proyecto de Programación Web "E-Sports" (2021-1)
https://github.com/PieroNarciso/e-sports

### Instrucciones de instalación
Instalar las dependencias de `npm`

```bash
$ npm install
```

Crear un arhico `.env` en el root del proyecto teniendo como ejemplo el archivo `.env.sample` que contengan las variables de la base de datos de desarrollo.

```bash
DB_USERNAME=<username>
DB_PASSWORD=<password>
DB_DATABASE=<database>
DB_HOST=<host>
```

Compilar tailwindcss y se genera un archivo en el path `./src/public/css/index.css`
> Esto se realizará cada vez que se cambie alguna configuración de tailwindcss

```bash
$ npm run dev:tailwind
```

Correr el script de desarrollo

```bash
$ npm run dev
```
