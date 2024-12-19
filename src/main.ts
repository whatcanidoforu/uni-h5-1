import { createSSRApp } from "vue";
import App from "./App.vue";
import formatTime from "./directives/time-format";
import formatMoney from "./directives/money-format";
import permission from "./directives/permission";
import { somePermission } from "./directives/permission";
import showLog from "./directives/show-log";
import thousands from "./directives/thousands";

export function createApp() {
  const app = createSSRApp(App);
  app.directive("time-format", formatTime);
  app.directive("money-format", formatMoney);
  app.directive("thousands", thousands);
  app.directive("permission", permission);
  app.directive("some-permission", somePermission);
  app.directive("show-log", showLog);
  return {
    app,
  };
}
