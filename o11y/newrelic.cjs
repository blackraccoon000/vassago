"use strict";

// 参考設定
// https://www.thisdot.co/blog/integrating-next-js-with-new-relic

const app_name = process.env.NEW_RELIC_APP_NAME;
const license_key = process.env.NEW_RELIC_LICENSE_KEY;

exports.config = {
  app_name: [app_name],
  license_key,
  // https://docs.newrelic.com/jp/docs/logs/logs-context/configure-logs-context-nodejs/
  application_logging: {
    forwarding: {
      enabled: true,
    },
  },
  // ロギングの設定により標準出力をトレースする
  logging: {
    level: "info",
    enabled: true, // ログの収集を有効にする
  },
  allow_all_headers: true,
  attributes: {
    /**
     * Prefix of attributes to exclude from all destinations. Allows * as wildcard
     * at end.
     *
     * NOTE: If excluding headers, they must be in camelCase form to be filtered.
     *
     * @name NEW_RELIC_ATTRIBUTES_EXCLUDE
     */
    exclude: [
      "request.headers.cookie",
      "request.headers.authorization",
      "request.headers.proxyAuthorization",
      "request.headers.setCookie*",
      "request.headers.x*",
      "response.headers.cookie",
      "response.headers.authorization",
      "response.headers.proxyAuthorization",
      "response.headers.setCookie*",
      "response.headers.x*",
    ],
  },
};
