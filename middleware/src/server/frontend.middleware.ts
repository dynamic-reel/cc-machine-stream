
import { Injectable, NestMiddleware } from '@nestjs/common';
import * as path from 'path';
import { Request, Response } from 'express';
import { appConfig } from '../config';
import { AppService } from './../app.service';

var hash = require('object-hash');

const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
];

const resolvePath = (file: string) => path.resolve(`${appConfig.outputDiv}fe/${file}`);

@Injectable()
export class FrontendMiddleware implements NestMiddleware {

  constructor(
    private appService: AppService,
  ) {}

  use(req: Request, res: Response, next: Function) {

    const { url } = req;

    // if (this.appService.testUserGid) {
    //   console.log(`--- [FrontendMiddleware] testUserGid: ${this.appService.testUserGid} ---`);
    //   req.headers.user_id = this.appService.testUserGid;
    // }
    // req.headers.user_email = this.appService.testUserEmail;

    // req.headers.user_id = `z0001z9k`; // James T. Kirk
    // req.headers.user_id = `Z0001FWD`; // Commander Spock
    // req.headers.user_id = `X001`; // Harry Potter
    // req.headers.user_id = `X003`; // Ron Weasley
    // req.headers.user_id = `ZZZZZZYE`; // Michael Burnham

    // if (url.startsWith(appConfig.API_PREFIX) || url.startsWith(appConfig.AUTH_PREFIX)) {
    if (url.startsWith(appConfig.API_PREFIX)) {
      // console.log('--- new, streamlined middleware: middleware request ---');
      next();
    }
    // else if (url.startsWith('/documentation')) {
    //   res.sendFile(resolvePath(req.path));
    // }
    else if (allowedExt.filter(ext => url.indexOf(ext) > 0).length > 0) {
      // it has a file extension --> resolve the file
      res.sendFile(resolvePath(req.path));
    }
    else {
      // let header = { ...req.headers, ts: new Date().getTime() };
      // // console.log( header );

      // const headerHash = hash( header );
      // // console.log( headerHash );

      // if (req.headers?.user_id) {
      //   process.env.USER_ID = req.headers.user_id as string;
      // }
      // else {
      //   process.env.USER_ID = 'no_gid_provided';
      // }

      // process.env.USER_EMAIL = req.headers.user_email as string;

      // console.log(`process.env.USER_ID   : ${process.env.USER_ID}`);
      // console.log(`process.env.USER_EMAIL: ${process.env.USER_EMAIL}`);

      // in all other cases, redirect to the index.html!
      res.sendFile(resolvePath(`index.html`));
    }
  }
}
