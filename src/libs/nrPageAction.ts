/**
 * newrelicのページアクショレポートを送信する
 * @param name
 * @param attributes
 * @MEMO QueryYourData -> SELECT * FROM PageAction にて確認できる
 */
export const nrPageAction = (name: string, attributes?: object | undefined) => {
  /**
   * NewRelicのBrowserAgentはNext.jsと相性が良くない。
   * SSR時にNREUMが存在しないためエラーになる。
   * これを防ぐためにはnode_modules内のnewrelicに修正が必要になるため、
   * windowオブジェクト内に生成されるnewrelicを利用する。
   */
  window.newrelic?.addPageAction(name, attributes);
};
