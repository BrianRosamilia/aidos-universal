import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';

import * as fs from 'fs';
import * as pem from 'pem';
import * as https from 'https';
import * as morgan from 'morgan';
import * as express from 'express';
import * as session from 'express-session';
import * as compression from 'compression';

import { enableProdMode } from '@angular/core';

import { ServerAppModule } from './app/server-app.module';
import { ngExpressEngine } from './platform/ng-express-engine/express-engine';

import { ROUTES } from './routes';
import { ENV_CONFIG } from './config';

const app = express();

if (ENV_CONFIG.production) {
  enableProdMode();
  app.use(compression());
}

app.use(morgan('dev'));

app.engine('html', ngExpressEngine({
  bootstrap: ServerAppModule
}));

app.set('view engine', 'html');
app.set('views', 'src');

app.use('/', express.static('dist', { index: false }));

ROUTES.forEach((route: string) => {
  app.get(route, (req, res) => {
    res.cookie('uiOrigin', ENV_CONFIG.ui.baseUrl, {
      maxAge: 1000 * 60 * 15,
      httpOnly: true,
      signed: false
    });
    res.render('../dist/index', {
      req: req,
      res: res
    });
  });
});

function createHttpsServer(keys) {
  https.createServer({
    key: keys.serviceKey,
    cert: keys.certificate
  }, app).listen(ENV_CONFIG.ui.port, ENV_CONFIG.ui.address, () => {
    console.log(`Listening at ${ENV_CONFIG.ui.baseUrl}`);
  });
}

if (ENV_CONFIG.ui.ssl) {
  let serviceKey;
  try {
    serviceKey = fs.readFileSync('./config/ssl/key.pem');
  } catch (e) {
    console.warn('Service key not found at ./config/ssl/key.pem');
  }

  let certificate;
  try {
    certificate = fs.readFileSync('./config/ssl/cert.pem');
  } catch (e) {
    console.warn('Certificate not found at ./config/ssl/key.pem');
  }

  if (serviceKey && certificate) {
    createHttpsServer({
      serviceKey: serviceKey,
      certificate: certificate
    });
  } else {

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

    pem.createCertificate({
      days: 1,
      selfSigned: true
    }, (error, keys) => {
      createHttpsServer(keys);
    });
  }
} else {
  app.listen(ENV_CONFIG.ui.port, ENV_CONFIG.ui.address, () => {
    console.log(`Listening at ${ENV_CONFIG.ui.baseUrl}`);
  });
}
