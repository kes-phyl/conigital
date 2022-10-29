FROM node:19-alpine
WORKDIR /app
COPY package.json ./app
RUN npm install
COPY . /app/
CMD ["node", "app.js"]
