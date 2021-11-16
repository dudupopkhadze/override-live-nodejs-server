const CDP = require("chrome-remote-interface");

(async function () {
  const cdp = await CDP({ port: 9229 });
  await cdp.Runtime.enable();

  const prototype = await cdp.Runtime.evaluate({
    expression: "require('http').Server.prototype",
    includeCommandLineAPI: true,
    returnByValue: false,
  });

  const listOfObjects = await cdp.Runtime.queryObjects({
    prototypeObjectId: prototype.result.objectId,
  });

  const listOfInstances = await cdp.Runtime.getProperties({
    objectId: listOfObjects.objects.objectId,
  });

  const serverInstance = listOfInstances.result[0].value.objectId;

  await cdp.Runtime.evaluate({
    expression:
      "var overRideListeners = require(`./cool_code`).overRideListeners",
    includeCommandLineAPI: true,
    returnByValue: false,
  });

  await cdp.Runtime.callFunctionOn({
    objectId: serverInstance,
    functionDeclaration: "function() { overRideListeners(this) }",
    returnByValue: true,
  });

  await cdp.Runtime.releaseObject({ objectId: serverInstance });
  await cdp.close();
})();
