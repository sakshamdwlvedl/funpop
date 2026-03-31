import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';

if (environment.production) {
  enableProdMode();

  const emptyFnc = () => {};

  window.console = {
    log: emptyFnc,
    warn: emptyFnc,
    error: emptyFnc,
    info: emptyFnc,
    debug: emptyFnc,
    trace: emptyFnc,
  } as Console;

  window.prompt = () => null;
}
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
