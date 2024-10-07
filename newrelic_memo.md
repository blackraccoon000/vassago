# NewRelicAgent 経由での設定例

- この設定だけだとうまく動作しないところがある。
- 動作しているところもある。全般的に謎。

## newrelic.js の設定例

```
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
```

## NewRelicAgent の設定例

```typescript
import {BrowserAgent, GenericEvents} from "@newrelic/browser-agent";
import {useEffect} from "react";

/**
 * NewRelicのブラウザから設定情報を取得
 * Browser-> Application -> ApplicationSetting -> AgentAndAccountのJavaScriptSnipetから取得
 */
export const options = {
  init: {
    distributed_tracing: {enabled: true},
    privacy: {cookies_enabled: true},
    ajax: {deny_list: ["bam.nr-data.net"]},
  },
  loader_config: {
    accountID: process.env.NEXT_PUBLIC_NEW_RELIC_ACCOUNT_ID,
    trustKey: process.env.NEXT_PUBLIC_NEW_RELIC_TRUST_KEY,
    agentID: process.env.NEXT_PUBLIC_NEW_RELIC_AGENT_ID,
    licenseKey: process.env.NEXT_PUBLIC_NEW_RELIC_LICENSE_KEY,
    applicationID: process.env.NEXT_PUBLIC_NEW_RELIC_APPLICATION_ID,
  },
  info: {
    beacon: "bam.nr-data.net",
    errorBeacon: "bam.nr-data.net",
    licenseKey: process.env.NEXT_PUBLIC_NEW_RELIC_LICENSE_KEY,
    applicationID: process.env.NEXT_PUBLIC_NEW_RELIC_APPLICATION_ID,
    sa: 1,
  },
  features: [GenericEvents],
};

/**
 * newrelic.getBrowserTimingHeaderのみで動作する模様
 * 本当はトレードオフになる設定ではないかと思う
 */
const NewRelicAgent = () => {
  useEffect(() => {
    // https://github.com/newrelic/newrelic-browser-agent/issues/865#issuecomment-2116600043
    if (typeof window !== "undefined") {
      const agent = new BrowserAgent(options);
      agent.start();
    }
  }, []);

  return null;
};

export default NewRelicAgent;
```

## src/pages/\_app.page.tsx の設定例

- NewRelicAgent を Next.js 経由で追加する場合、SSR で発火しないように工夫する必要がある。

```typescript
import "@/styles/globals.css";
import type {AppProps} from "next/app";
import dynamic from "next/dynamic";

const NewRelicAgent = dynamic(() => import("../components/NewRelicAgent"), {
  ssr: false,
});

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <NewRelicAgent />
      <Component {...pageProps} />
    </>
  );
}
```

## next.config.js の設定例

- nrExternals は、おそらく BrowserAgent を使う場合に必要になる。
- Next.js は BrowserAgent を利用する際に SSR 側で動作不良があるため、BrowserAgent を利用しないほうが安定する。

```typescript
import nrExternals from "@newrelic/next/load-externals.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "page.ts", "api.ts"],
  webpack: (config) => {
    nrExternals(config);
    return config;
  },
};

export default nextConfig;
```
