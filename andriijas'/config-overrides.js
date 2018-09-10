const { compose } = require("react-app-rewired");
const rewireLess = require("react-app-rewire-less-modules");
//const rewireLess = require("react-app-rewire-less");

module.exports = function override(config, env) {
  const rewires = compose(rewireLess);

  return rewires(config, env);
};
