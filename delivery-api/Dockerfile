FROM node:18

WORKDIR /delivery-api
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3333
CMD ["npm", "start"]
