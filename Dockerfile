FROM node:16-alpine3.16
WORKDIR /amazon_clone
COPY yarn.lock package.json ./
RUN yarn
COPY . .

FROM node:16-alpine3.16
USER node
RUN mkdir /home/node/amazon_clone
WORKDIR /home/node/amazon_clone
COPY --from=0 --chown=node:node /amazon_clone .
RUN yarn run build
CMD ["yarn", "start"]