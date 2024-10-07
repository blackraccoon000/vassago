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
    <div className="">
      <h1>test</h1>
      <button
        onClick={() => {
          nrPageAction("new data3");
        }}
      >
        Click me
      </button>
    </div>
  );
}
