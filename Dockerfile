FROM node:12.22.1
EXPOSE 7000

WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
ENTRYPOINT ["./ops/entrypoint.sh"]
CMD ["yarn", "start"]