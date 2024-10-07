/**
 * newrelicに直接ログを送信する
 * @param message
 * @param options
 * @MEMO QueryYourData -> SELECT * FROM Log にて確認できる
 */
export const nrLog = (
  message: string,
  options?: {
    customAttributes?: object;
    level?: "ERROR" | "TRACE" | "DEBUG" | "INFO" | "WARN";
  }
) => {
  window.newrelic?.log(message, options);
};
