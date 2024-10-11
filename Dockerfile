FROM node:18-alpine AS base

# Crear app directory y lo uso como working directory
RUN mkdir -p /usr/app
WORKDIR /usr/app

# ** Build de back partimos de base pero creamos la fase back-build
FROM base as back-build

# Hacemos el install y el build
RUN npm ci
RUN npm run build

# ** Fase Release, juntamos las piezas de las distintas fase
FROM base AS release
COPY --from=back-build /usr/app/dist ./
COPY ./package.json ./

# Actualizamos las rutas del package.json para que apunten a dist
RUN apk update && apk add jq
RUN updatedImports="$(jq '.imports[]|=sub("./src"; ".")' ./package.json)" && echo "${updatedImports}" > ./package.json
COPY ./package-lock.json ./
RUN npm ci --only=production

# Le indicamos variables de entorno (OJO sensibles NO)
EXPOSE 3000
ENV PORT=3000
ENV STATIC_FILES_PATH=./public
ENV API_MOCK=false
ENV AUTH_SECRET=MY_AUTH_SECRET


# Ejecutamos al aplicación (OJO CMD no lo hacemos con RUN)
CMD node index

