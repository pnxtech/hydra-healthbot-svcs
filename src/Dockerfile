FROM node:12-alpine
LABEL maintainer="Carlos Justiniano cjus@ieee.org"
HEALTHCHECK --start-period=10s --interval=30s --timeout=3s CMD curl -f http://localhost:7777/v1/healthbot/health || exit 1
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN echo "package-lock=false" > .npmrc
RUN npm install --production
ENTRYPOINT ["node", "healthbot-svcs"]

