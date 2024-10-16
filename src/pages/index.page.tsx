// import {browerLogger} from "@/libs/browserLogger";
import {nrLog} from "@/libs/nrLog";
import {nrPageAction} from "@/libs/nrPageAction";
import {useEffect} from "react";

export default function Home() {
  useEffect(() => {
    nrLog("Home Page Pino For NrLog");
    // browerLogger.info("Home Page Pino");
  }, []);

  return (
    <div className="flex justify-center">
      <div className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl">Hello, Tailwind CSS!</h1>
      </div>
      <article className="bg-blue-50">
        <h1>test</h1>
        <button
          onClick={() => {
            nrPageAction("new data3");
          }}
        >
          Click me
        </button>
      </article>
    </div>
  );
}
