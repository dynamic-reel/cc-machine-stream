
export class MachinesResponse {
    data: Machine[];
}

export class Machine {
    status: string;
    machine_type: string;
    longitude: number;
    latitude: number;
    last_maintenance: string;
    install_date: string;
    id: string;
    floor: number;
    opened?: boolean;
}

export class MachineDetails extends Machine {
    events: MachineEvent[];
}

export class MachineEvent {
    status: string;
    timestamp: string;
}
