module.exports = function override(config, env) {
  // Remove source-map-loader from the webpack config
  config.module.rules = config.module.rules.map(rule => {
    if (rule.enforce === 'pre' && rule.use && rule.use.some(loader => loader === 'source-map-loader')) {
      rule.exclude = /node_modules\/@prisma\/client/;
    }
    return rule;
  });

  return config;
}
