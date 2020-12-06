const main = async () => {
  const hydraExpress = require('hydra-express');
  const hydra = hydraExpress.getHydra();
  const HydraLogger = require('hydra-plugin-hls/hydra-express');
  const hydraLogger = new HydraLogger();
  hydraExpress.use(hydraLogger);

  const taskr = require('./lib/taskr');
  const slack = require('./lib/slack');
  const config = require('./config.json');

  try {
    const serviceInfo = await hydraExpress.init(config, config.hydra.serviceVersion, () => {
      hydraExpress.registerRoutes({
        '/v1/health': require('./routes/health-v1-routes')
      });
    });

    console.log(`Started ${hydra.getServiceName()} (v.${hydra.getInstanceVersion()})`);
    console.log(serviceInfo);
    slack.post(`Starting ${serviceInfo.serviceName} on ${serviceInfo.serviceIP}: ${serviceInfo.servicePort}`);
    taskr.init(config.taskr);
  } catch (err) {
    const stack = err.stack;
    console.error(stack);
  }
};

main();
