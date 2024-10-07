import pino from "pino";

/**
 * NewRelicでログ情報をキャッチするログを出力する
 */
export const apiLogger = pino({
  level: process.env.LOG_LEVEL || "info",
  base: {
    logtype: "application", // ログタイプを指定
  },
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true, // 色を付けるオプション
    },
  },
});
