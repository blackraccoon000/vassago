import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import newrelic from "newrelic";

type MyDocumentProps = DocumentInitialProps & {
  browserTimingHeader: string;
};

// memo: https://qiita.com/gizumon/items/796874fb2c664fc0c723
class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & {browserTimingHeader: string}> {
    const initialProps = await Document.getInitialProps(ctx);

    // NewRelicのスクリプトを生成
    const browserTimingHeader = newrelic.getBrowserTimingHeader({
      hasToRemoveScriptWrapper: true,
    });

    return {
      ...initialProps,
      browserTimingHeader,
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{__html: this.props.browserTimingHeader}}
        />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
