FROM node:14.17.4

ENV GOPROXY https://goproxy.cn/

RUN mkdir -p /data/www/dpasswd

WORKDIR /data/www/dpasswd/

ADD ./ /data/www/dpasswd

EXPOSE 8000

RUN npm i

RUN npm run build

ENTRYPOINT npm run serve
