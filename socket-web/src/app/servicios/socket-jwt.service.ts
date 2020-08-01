import { Injectable } from '@angular/core';
import { Socket} from 'ngx-socket-io';
import { PermisosService } from './permisos.service';



@Injectable()

export class SocketJwtService extends Socket {

  constructor( private permisos: PermisosService) { 
    //const token =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5vbWJyZSI6Ikp1YW4iLCJwYXNzdyI6IjEyMyIsImNyZWF0ZUF0IjoiMjAyMC0wNy0wNVQwMToxOTowMy4zODBaIiwic2Vzc2lvbklEIjoiQTR6V3h6YVVJWkRjM050UWpVQmZjdnBaTXFiOG9zaS0iLCJfaWQiOiI1ZjAxMmE4N2VmYzkzYTA1YzQ0MmI2MTQifSwiaWF0IjoxNTk0NzA0NjkyLCJleHAiOjE1OTQ3NjQ2OTJ9.LbhnBvKmdZRI5MBvuR9mI-JkOu20P__J7hV1h6XUzH0'
    super({url: 'http://localhost:3500', options: {
      query: `token=${permisos.obtenerToken()}&sessionID=${permisos.obtenerSessionLogin()}`
    }
  })
  console.log(permisos.obtenerToken())
  }
}
