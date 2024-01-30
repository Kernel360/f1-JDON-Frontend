const fs = require("fs");
const path = require("path");

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // 웹팩 설정 커스터마이즈
      return webpackConfig;
    },
  },
  devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
    // devServerConfig.https = {
    //   key: fs.readFileSync(path.resolve(__dirname, "localhost+1-key.pem")),
    //   cert: fs.readFileSync(path.resolve(__dirname, "localhost+1.pem")),
    // };
    return devServerConfig;
  },
};
