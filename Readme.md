# Microservice POC

This is a Proof Of Concept to show how microservices could communicate.

## Starting

```sh
docker-compose up -d
```

The front facing api will be accessible on port 3030 [http://localhost:3030/](http://localhost:3030/).
For debug the adjective and word services are accessible on ports 3032 and 3031 respectively.

On request the web service request a noun and a verb to the word service and an adjective to the adjective service.
