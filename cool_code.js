const Shimmer = require("shimmer");
const overRideListeners = (emitter) => {
  const listeners = emitter.listeners("request");
  emitter.removeAllListeners("request");
  listeners.forEach((list) => {
    const holder = { list };
    Shimmer.wrap(holder, "list", (original) => {
      return function (req, res) {
        if (req.method === "PATCH") {
          res.writeHead(405);
          res.end();
          return;
        }
        return original.apply(this, arguments);
      };
    });
    emitter.on("request", holder.list);
  });
};
module.exports = {
  overRideListeners,
};
