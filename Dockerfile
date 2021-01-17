# Nodejs image
FROM node

#Create working directory
WORKDIR /app

#COPY pakcage.json
COPY package*.json /app/

#Install npm dependencies & audit fix npm dependencies
RUN npm ci --production && npm audit fix

#COPY 
COPY . /app

#Execute App
CMD npm start

#Expose Port
EXPOSE 8000