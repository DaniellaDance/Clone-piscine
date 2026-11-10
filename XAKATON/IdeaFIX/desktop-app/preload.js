/* IdeaFix Desktop — preload.
   Мост между окном и системой: в демо-версии наружу отдаётся только версия
   приложения и платформа. Никаких прямых доступов к файловой системе из UI. */

const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('ideafix', {
  version: '1.0.0',
  platform: process.platform,
  mode: 'desktop'
});
