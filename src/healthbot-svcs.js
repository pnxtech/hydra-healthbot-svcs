const main = async () => {
  const hydraExpress = require('hydra-express');
  const hydra = hydraExpress.getHydra();
  const HydraLogger = require('hydra-plugin-hls/hydra-express');
  const hydraLogger = new HydraLogger();
  hydraExpress.use(hydraLogger);

  const dispatcher = require('./lib/dispatcher');
  const taskr = require('./lib/taskr');
  const config = require('./config/config.json');

  try {
    const serviceInfo = await hydraExpress.init(config, config.hydra.serviceVersion, () => {
      hydraExpress.registerRoutes({
        '/v1/healthbot': require('./routes/health-v1-routes')
      });
    });

    console.log(`Started ${hydra.getServiceName()} (v.${hydra.getInstanceVersion()})`);
    console.log(serviceInfo);
    dispatcher.init(config);
    taskr.init(config);
  } catch (err) {
    const stack = err.stack;
    console.error(stack);
  }
};

main();
