# hydra-healthbot-svcs
Hydra Health Bot Service

<img src="assets/hydra-healthbot-logo.png" width="400px" />

The Hydra HealthBot service is a hydra-enabled microservice which monitors the health of Redis and dependant microservices.  The service is intended to be used inside of a Docker Swarm/Kubernetes cluster.

HealthBot performs its duties using a built-in (cron-like) task scheduler.

Two built-in tasks are provided, but others can be added.

* tasks/hydramon.js - monitors hydra microservices
* tasks/redismon.js - monitors redis utilization

## Intended use

HealthBot is intended for use in its docker container form and deployed to a Docker Swarm or Kubernetes cluster. Available container images are hosted on [Docker Hub](https://hub.docker.com/repository/docker/pnxtech/hydra-healthbot-svcs).

Recommended release: `pnxtech/hydra-healthbot-svcs:1.0.0`

## Infrastructure requirements
HealthBot is a Hydra microservice and so an accessible instance of Redis is required.

