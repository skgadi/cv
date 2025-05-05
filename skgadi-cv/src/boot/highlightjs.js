import { boot } from 'quasar/wrappers';
import VueHighlightJS from 'vue3-highlightjs';
import 'highlight.js/styles/default.css'; // Choose your preferred theme

export default boot(({ app }) => {
  app.use(VueHighlightJS);
});
