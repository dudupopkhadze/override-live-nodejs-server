const Shimmer = require("shimmer");
const overRideListeners = (emitter) => {
  const listeners = emitter.listeners("request");
  emitter.removeAllListeners("request");
  listeners.forEach((list) => {
    const holder = { list };
    Shimmer.wrap(holder, "list", (original) => {
      return function (req, _) {
        if (req.method === "PATCH") return;
        return original.apply(this, arguments);
      };
    });
    emitter.on("request", holder.list);
  });
};
module.exports = {
  overRideListeners,
};
