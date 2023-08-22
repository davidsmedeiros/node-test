FROM node:12

WORKDIR /app

COPY ./package.json .
RUN npm cache clean --force
RUN npm install
COPY . .

EXPOSE 3000

RUN chmod +x startup.sh
RUN npm i -g sequelize-cli

ENTRYPOINT ["sh", "./startup.sh" ]

# CMD npm start
# CMD [ "node", "index.js"]
# CMD ["sh", "-c","--","echo 'started';while true; do sleep 1000; done"]