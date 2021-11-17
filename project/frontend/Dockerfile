
FROM node:16-alpine AS builder

# Use /usr/src/app as our workdir. The following instructions will be executed in this location.
WORKDIR /usr/src/app

COPY . .

ARG REACT_APP_BACKEND_URL='http://localhost:8081/api'

RUN npm install && \
        REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL} npm run build

FROM node:16-alpine
COPY --from=builder /usr/src/app/build /build

RUN adduser -D appuser && \
        npm install -g serve
USER appuser

CMD serve -s -l 3000 /build