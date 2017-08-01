// import './polyfills';
//
// import 'core-js/es7/reflect';
//
// import { platformBrowser } from '@angular/platform-browser';
// import { enableProdMode } from '@angular/core';
//
// import { AppModuleNgFactory } from './app.module.ngfactory';
//
// enableProdMode();
//
// platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
import 'core-js/es7/reflect';
import {platformBrowser} from '@angular/platform-browser';
import {AppModuleNgFactory} from './ngfactory/assets/app/app.module.ngfactory';
import {enableProdMode} from "@angular/core";

enableProdMode();

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
