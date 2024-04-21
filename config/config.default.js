/* eslint valid-jsdoc: "off" */

// const sequelize = {
//   dialect: 'mysql',
//   host: '127.0.0.1',
//   port: 3306,
//   database: 'pinche',
//   username: 'root',
//   password: '12345678',
// };

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    // sequelize,
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1713724436387_4724';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
