FROM node:20
WORKDIR /app/frontend
COPY ./client/package*.json ./
RUN npm install
COPY ./client /app/frontend/
EXPOSE 5173
CMD ["npm", "run", "dev"]
