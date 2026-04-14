FROM alpine:latest

WORKDIR /app

COPY . .

RUN chmod +x pocketbase

EXPOSE 8080

CMD ["./pocketbase", "serve", "--http=0.0.0.0:8080"]