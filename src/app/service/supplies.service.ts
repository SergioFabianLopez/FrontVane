import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Suplies } from '../interface/suplies';
import { Zone } from '../interface/zone';
import { Typemessage } from '../interface/typemessage';
import { Message } from '../interface/message';

@Injectable({
  providedIn: 'root'
})
export class SuppliesService {
  private url = 'http://localhost:3000/api/suppliers/';
  constructor(private http: HttpClient) { }

  get_Suplies(): Observable<Suplies[]>{
    const urlSuplies = `${this.url}getSuplies`;
    return this.http.get<Suplies[]>(urlSuplies).pipe(
      map((response) =>
        response.map((item: Suplies) => ({
          id: item.id,
          name: item.name,
          supplier_number: item.supplier_number,
          minimum_delivery: item.minimum_delivery,
          responsible_person: item.responsible_person,
          phone: item.phone,
          email: item.email,
          zones_id: item.zones_id,
          is_active: item.is_active,
        }))
      )
    )
  }


  getZonesbySupplies(supplieid:number): Observable<Zone[]>{
    const urlSuplies = `${this.url}getZonesbySupplies?id=${supplieid}`;
    return this.http.get<Zone[]>(urlSuplies).pipe(
      map((response) =>
        response.map((item: Zone) => ({
          id: item.id,
          name: item.name,
          is_active: item.is_active,
        }))
      )
    )
  }

  getZones(): Observable<Zone[]>{
    const urlSuplies = `${this.url}getZones`;
    return this.http.get<Zone[]>(urlSuplies).pipe(
      map((response) =>
        response.map((item: Zone) => ({
          id: item.id,
          name: item.name,
          is_active: item.is_active
        }))
      )
    )
  }

  getTypeMessages(): Observable<Typemessage[]>{
    const urlSuplies = `${this.url}getTypeMessages`;
    return this.http.get<Typemessage[]>(urlSuplies).pipe(
      map((response) =>
        response.map((item: Typemessage) => ({
          id: item.id,
          name: item.name,
          is_active: item.is_active,
        }))
      )
    )
  }

  getMessageByType(messageId:number): Observable<Message[]>{
    const urlSuplies = `${this.url}getMessageByType?id=${messageId}`;
    return this.http.get<Message[]>(urlSuplies).pipe(
      map((response) =>
        response.map((item: Message) => ({
          id: item.id,
          message: item.message,
          category_id: item.category_id,
          is_active: item.is_active,
        }))
      )
    )
  }

  sendMessage(idsupplie:number, zones:Array<any>, zonesExt: Array<any>, message: string): Observable<string> {
    const urlSuplies = `${this.url}sendMessage`; // La URL para tu endpoint POST
    
    // Crear el cuerpo de la solicitud
    const body = {
      supplie: idsupplie,
      zones: zones,
      zonesExt: zonesExt,
      message: message
    };
  
    return this.http.post<{ message: string }>(urlSuplies, body).pipe(
      map((response) => response.message) // Extraer solo el mensaje de la respuesta
    );
  }
}
