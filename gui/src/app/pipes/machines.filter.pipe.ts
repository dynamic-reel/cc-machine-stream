
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMachines',
  pure: true,
})
export class MachinesFilterPipe implements PipeTransform {

    constructor() {}

    public transform(array: any[], machineType: string | null): any[] {

      // return array;

      if (machineType === 'both') {
        return array;
      }

      return array.filter(item => item.machine_type === machineType);

      // switch( machineType ) {
      //   case 'measurement':
      //     return array.filter(item => item.machine_type === machineType);
      //     break;
      // }

        // if (!array) return;
        // if (!filterStr) { return array; }

        // return array.filter( x => new RegExp(filterStr, 'g').test( x.fqdn ) );

    }

}
