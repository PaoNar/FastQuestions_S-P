import { DatePipe } from '@angular/common';

export class Usuario {
    _id: string;
    nombre: string;
    apellido: string;
    genero: string;
    email: string;
    foto: string;
    sessionId?: string;
    passw?: string;
    // createdAt?: Date;
    lastActiveAt?: number = Date.now();
}
