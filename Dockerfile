
### STAGE 1a: Frontend Packages ###
FROM node:12.16.0-alpine as frontend-packages
COPY /gui/package.json /gui/package-lock.json /
ENV NG_CLI_ANALYTICS=ci
RUN npm ci 

### STAGE 1: Build Frontend ###
FROM node:12.16.0-alpine as frontend-builder
RUN mkdir /ng-app
COPY --from=frontend-packages /node_modules /ng-app/node_modules
WORKDIR /ng-app
COPY /gui /ng-app
# RUN npm run updateversion
RUN npm run build:prod



FROM node:12.16.0-alpine as middleware-packages
COPY /middleware/package.json /middleware/package-lock.json /
RUN npm ci



### STAGE 2: Build Backend/Middleware ###
FROM node:12.16.0-alpine as middleware-builder

RUN mkdir /middleware
COPY --from=middleware-packages /node_modules /middleware/node_modules
WORKDIR /middleware
COPY /middleware /middleware
RUN npm run build



### STAGE 3: Create Final Image ###
FROM node:12.16.0-alpine
COPY --from=frontend-builder /ng-app/dist /dist/fe
COPY --from=middleware-builder /middleware/dist /dist/middleware
COPY --from=middleware-builder /middleware/node_modules /node_modules
COPY /middleware/package.json /
COPY /middleware/tsconfig.json /middleware/tsconfig.build.prod.json /
COPY /middleware/src /src


EXPOSE 80

CMD npm run start:prod
