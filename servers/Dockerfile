FROM node

WORKDIR /app

COPY package.json /app

COPY . /app

RUN npm install

EXPOSE 8000

CMD ["npm", "start"]