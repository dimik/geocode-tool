FROM node:alpine
WORKDIR /app
EXPOSE 8887
COPY . . 
RUN npm install
CMD ["node", "server.js"]
