# Usar una imagen de node como imagen base
FROM node:18 as build

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar los archivos de la aplicación Angular
COPY . .

# Instalar las dependencias
RUN npm install

# Construir la aplicación Angular
RUN npm run build --prod

# Usar una imagen de nginx como imagen base
FROM nginx:alpine

# Copiar los archivos generados por la construcción de la aplicación al directorio predeterminado de nginx
COPY --from=build /app/dist/DirectoryAppFront/browser /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 4200

# Comando para ejecutar nginx
CMD ["nginx", "-g", "daemon off;"]
