import { pedido } from "./pedido";
import { reserva } from "./reserva";

export class Cliente {
    id: number = 0;
    cedula: String = '';
    nombre: String = '';
    apellido: String = '';
    direccion: String = '';
    email: String = '';
    contrasenia: String = '';
    membresia: boolean = false;
    pedidos: pedido[] = [];
    reservas: reserva[] = [];

}

declare global {
    var id: number;    
}