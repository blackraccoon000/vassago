import {NextRequest, NextResponse} from "next/server";
import {browerLogger} from "./libs/browserLogger";

/**
 * @MEMO middlewareはEdgeランタイムで実行されるため、
 * middleware内では使用できるモジュールに制限がある。
 */
export function middleware(req: NextRequest) {
  // middleware内でロガーを設定しても上手く動作しないため、api/logsにログ情報を送信する
  browerLogger.info("middleware Pino");
  return NextResponse.next();
}

// ミドルウェアを適用するパスを指定
export const config = {
  matcher: [
    // ログを送信するパス以外のリクエストにミドルウェアを適用
    "/(!api/logs)",
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
