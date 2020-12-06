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

## Configuration
The supplied config/sample-config.json file contains the two provided tasks. The first step in configuring the this service for use is to update the timezone at the top of the file.

```js
{
  "taskr": {
    "timezone": "America/New_York",
    "path": "../tasks",
```

> Note: the timezone required is for the location where this service will be running.

For a list of supported timezones visit: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

### Enabling Slack integration

```js
  "slackWebHookUrl": "https://hooks.slack.com/services/T0FAKE77D/B5FAKE5CZ/V7r6oUfFAKEL8yrygrfo6uY8",
```
