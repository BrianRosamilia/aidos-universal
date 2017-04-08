import { InjectionToken } from '@angular/core';

interface ServerConfig {
  ssl: boolean;
  address: string;
  port: number;
  nameSpace: string;
  baseUrl: string;
};

interface GlobalConfig {
  ui: ServerConfig;
  zuul: ServerConfig;
  cookieNames: string[];
  data: string[];
  logDirectory: string;
  prerenderStrategy: string;
  shibboleth: boolean;
  clientId: string;
  clientSecret: string;
  production: boolean;
  authorizationKey: string;
};

const GLOBAL_CONFIG: InjectionToken<GlobalConfig> = new InjectionToken<GlobalConfig>('config');

let production: boolean = false;

let ENV_CONFIG: GlobalConfig;

try {
  ENV_CONFIG = <GlobalConfig>require('../config/environment.default.js');
} catch (e) {
  throw new Error('Cannot find file config/environment.default.js');
}

switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    production = true;
    try {
      ENV_CONFIG = <GlobalConfig>Object.assign(ENV_CONFIG, require('../config/environment.prod.js'));
    } catch (e) {
      console.warn('Cannot find file config/environment.prod.js', 'Using default environment.');
    }
    break;
  case 'test':
    try {
      ENV_CONFIG = <GlobalConfig>Object.assign(ENV_CONFIG, require('../config/environment.test.js'));
    } catch (e) {
      console.warn('Cannot find file config/environment.test.js', 'Using default environment.');
    }
    break;
  default:
    try {
      ENV_CONFIG = <GlobalConfig>Object.assign(ENV_CONFIG, require('../config/environment.dev.js'));
    } catch (e) {
      console.warn('Cannot find file config/environment.dev.js', 'Using default environment.');
    }
}

ENV_CONFIG.production = production;

for (let key in ENV_CONFIG) {
  if (ENV_CONFIG[key].ssl !== undefined && ENV_CONFIG[key].address && ENV_CONFIG[key].port) {
    ENV_CONFIG[key].baseUrl = [
      ENV_CONFIG[key].ssl ? 'https://' : 'http://',
      ENV_CONFIG[key].address,
      (ENV_CONFIG[key].port !== 80 || ENV_CONFIG[key].port !== 443) ? ':' + ENV_CONFIG[key].port : '',
      ENV_CONFIG[key].nameSpace ? ENV_CONFIG[key].nameSpace : ''
    ].join('');
  }
}

if (ENV_CONFIG.clientId && ENV_CONFIG.clientSecret) {
  ENV_CONFIG.authorizationKey = new Buffer([ENV_CONFIG.clientId, ENV_CONFIG.clientSecret].join(':')).toString('base64');
}

export { GlobalConfig, GLOBAL_CONFIG, ENV_CONFIG }
