FROM node:12.22.0
EXPOSE 7000

WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
ENTRYPOINT ["sh", "/usr/src/app/ops/entrypoint.sh"]
CMD ["yarn", "start"]