import "reflect-metadata";

import Application from "./Application";
import Bootstrap from "./Bootstrap";
import { container } from "tsyringe";
import "./di";

const initDom = () => {
  (async () => {
    try {
      const app = container.resolve(Application);
      await app.init();
    } catch (e) {
      console.error(e);
    }
  })();
};

const bootstrap = new Bootstrap();
if (bootstrap.isReady()) {
  initDom();
} else {
  bootstrap.waitForReady(() => initDom());
}
