import {BrowserAgent} from "@newrelic/browser-agent";

/**
 * NewRelicに必要な型定義を追加
 */
declare global {
  interface Window {
    NREUM?: object | boolean;
    // NewRelicに情報を追加する関数などが追加されている
    newrelic?: BrowserAgent;
  }
}
