FROM node:19.9-alpine

RUN apk update \ 
    && apk upgrade --available \
    && apk --no-cache --virtual builder add curl 

RUN cd /tmp && \
    curl -#L https://github.com/tj/node-prune/releases/download/v1.0.1/node-prune_1.0.1_linux_amd64.tar.gz | tar -xvzf- && \
    mv -v node-prune /usr/local/bin && rm -rvf * 

WORKDIR /usr/src/app
COPY . .
RUN yarn --non-interactive --prod --silent \ 
    && node-prune
COPY demo.env ./.env
USER 1
CMD ["node", "index.js"]
