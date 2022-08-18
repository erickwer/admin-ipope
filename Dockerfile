
# Use official node image as the base image
FROM node:12.22.9

# Set the working directory
WORKDIR /app

COPY package.json .

RUN npm install -g @angular/cli && npm install --legacy-peer-deps

COPY . .

EXPOSE 4200

CMD [ "npm", "start" ]
