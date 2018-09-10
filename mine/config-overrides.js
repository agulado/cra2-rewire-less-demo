const rewireLess = require('react-app-rewire-less-modules');
// const rewireLess = require("react-app-rewire-less-modules");

module.exports = function(config, env) {

    config = rewireLess(config, env);

    return config;
}