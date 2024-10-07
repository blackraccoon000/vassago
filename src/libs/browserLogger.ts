import pino from "pino";

/**
 * ブラウザ+ミドルウェア環境で発生したログ情報をapi/logsに送信する
 * @MEMO https://qiita.com/P-man_Brown/items/0f0e0613fd9bb3e8c99c
 */
export const browerLogger = pino({
  level: process.env.LOG_LEVEL || "info", // 出力するログレベルを設定。指定したレベル以上のログが出力される
  timestamp: pino.stdTimeFunctions.isoTime, // タイムスタンプの形式の設定
  browser: {
    write: () => {}, // ブラウザのコンソールにログを出力しないようにする
    // ブラウザやミドルウェアのログをサーバーに送信するための設定
    transmit: {
      send: (level, logEvent) => {
        // childを使用する場合にはlogEvent.messagesだけでなく、bindingsもサーバーに送信する必要がある
        const messages = logEvent.messages;
        // /api/logにリクエストを送る
        fetch("http://localhost:3000/api/logs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({level, messages}),
          keepalive: true,
        });
      },
    },
  },
});
