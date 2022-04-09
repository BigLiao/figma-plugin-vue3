import { initApi } from './connection';

(async function () {
  figma.showUI(__html__, {
    width: 400,
    height: 600,
  });

  // wait for UI
  await new Promise(x => setTimeout(x, 1000));
  await initApi();
}());
