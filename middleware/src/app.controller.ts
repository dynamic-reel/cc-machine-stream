import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {

  constructor(
    private readonly appService: AppService,
  ) {}

  @Get('health')
  getHello(): any {
    return { health: 'ok' };
  }

  @Get('machines')
  getMachines(
    @Res() res,
  ) {
    // console.log('[MIDDLEWARE] --> GET getMachines()');
    return this.appService.getMachines()
    .subscribe( response => res.send(response.data), error => res.send(error), );
  }

  @Get('machines/:itemid')
  getSingleMachine(
    @Res() res,
    @Param('itemid') itemid: string
  ) {
    // console.log('[MIDDLEWARE] --> GET getSingleMachine()');
    return this.appService.getSingleMachine( itemid )
    .subscribe( response => res.send(response.data), error => res.send(error), );
  }

}
