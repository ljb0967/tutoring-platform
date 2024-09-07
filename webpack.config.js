const path = require("path");
const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Entry 포인트 확인 (파일 경로가 정확한지 확인하세요)
  config.entry = path.resolve(__dirname, "app.js");

  // Node.js 모듈을 브라우저에서 사용할 수 없도록 설정
  config.resolve = {
    ...config.resolve,
    fallback: {
      "zlib": require.resolve("browserify-zlib"),  
      "crypto": require.resolve("crypto-browserify"),
      "process": require.resolve("process/browser"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "net": false,
      "tls": false,
      "child_process": false,
      "aws-sdk": false,
    //   "mock-aws-s3": false,
    //   "nock": false,
      "url": require.resolve("url/"),
      "stream": require.resolve("stream-browserify"),
      "fs": false,
      "assert": require.resolve("assert/"),
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "querystring": require.resolve("querystring-es3"),
      "constants": false,
      "timers": require.resolve("timers-browserify"),
      "node-gyp": false,
      "npm": false,
      "vm": false,
      "async_hooks": false
    },
  };

  config.module.rules.push({
    test: /\.html$/,
    use: [
      {
        loader: "html-loader",
        options: { minimize: true },
      },
    ],
  });

  return config;
};
