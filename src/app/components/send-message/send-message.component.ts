import { Component, OnInit } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, map, startWith} from 'rxjs/operators';
import {AsyncPipe, CommonModule} from '@angular/common';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

import {MatCardModule} from '@angular/material/card';
import { SuppliesService } from '../../service/supplies.service';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


@Component({
  selector: 'app-send-message',
  imports: [FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe, MatIconModule,
    MatDividerModule, MatButtonModule,
    MatCardModule, CommonModule, MatSnackBarModule,
    MatSelectModule, NgxMatSelectSearchModule],
  templateUrl: './send-message.component.html',
  styleUrl: './send-message.component.css'
})
export class SendMessageComponent implements OnInit {
  myControl = new FormControl('');
  myControlZones = new FormControl('');
  myControlZonesExt = new FormControl('');
  myControlTypesMessages = new FormControl('');
  suppliers: any[] = [];
  zones: any[] = [];
  typesMessages: any[] = [];
  filteredOptions!: Observable<any[]>;
  filteredOptionsZones!: Observable<any[]>;
  filteredOptionsZonesExt!: Observable<any[]>;
  filteredOptionsTypesMessages!: Observable<any[]>;
  send_message:string = '';
  supplieid:number = 0;
  selectedZoneIds: number[] = [];
  selectedZoneExtIds: number[] = [];


  // FormControls para el select y el buscador
  searchControl = new FormControl('');
  

  constructor(private suppliesService: SuppliesService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getSuplies();
    this.getTypeMessages();
    this.getZones();
  }

  displaySupplierName(supplier: any): string {
    return supplier && supplier.name ? supplier.name : '';
  }
  displayTypeMessageName(typeMessage: any): string {
    return typeMessage && typeMessage.name ? typeMessage.name : '';
  }
  displayZoneName(zone: any): string {
    return zone && zone.name ? zone.name : '';
  }
  getSuplies() {
    // Obtener los proveedores desde el servicio
    this.suppliesService.get_Suplies().subscribe((data) => {
      this.suppliers = data; // Cargar datos en la lista completa

      // Configurar el filtrado basado en el FormControl
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || ''))
      );
    });
  }

  // getZonesbySupplies(event: MatAutocompleteSelectedEvent) {
  //   // Obtener los proveedores desde el servicio
  //   this.myControlZones.setValue('');
  //   const supplieValue = event.option.value;
  //   this.idsupplie = supplieValue.id;
  //   this.suppliesService.getZonesbySupplies(supplieValue.id).subscribe((data) => {
  //     this.zones = data; // Cargar datos en la lista completa

  //     // Configurar el filtrado basado en el FormControl
  //     this.filteredOptionsZones = this.myControlZones.valueChanges.pipe(
  //       startWith(''),
  //       map((value) => this._filterZones(value || ''))
  //     );
  //   });
  // }

  getZones() {
    // Obtener los proveedores desde el servicio
    this.suppliesService.getZones().subscribe((data) => {
      this.zones = data; // Cargar datos en la lista completa

      // Configurar el filtrado basado en el FormControl
      this.filteredOptionsZones = this.myControlZones.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterZones(value || ''))
      );
    });
    this.filteredOptionsZonesExt = this.filteredOptionsZones;
  }

  getTypeMessages() {
    // Obtener los proveedores desde el servicio
    this.suppliesService.getTypeMessages().subscribe((data) => {
      this.typesMessages = data; // Cargar datos en la lista completa

      // Configurar el filtrado basado en el FormControl
      this.filteredOptionsTypesMessages = this.myControlTypesMessages.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterTypesMessages(value || ''))
      );
    });
  }

  getMessageByType(event: MatAutocompleteSelectedEvent) {
    // Obtener los proveedores desde el servicio
    const typeMessageValue = event.option.value;
    this.suppliesService.getMessageByType(typeMessageValue.id).subscribe((data) => {
      this.send_message = data[0].message;
    });
  }
  getSelectedSupplie(event: MatAutocompleteSelectedEvent) {
    // Obtener los proveedores desde el servicio
    const supplieid = event.option.value;
    this.supplieid = supplieid.id;
  }

  onZonesSelected() {
    const selectedZones: any[] = Array.isArray(this.myControlZones.value) ? this.myControlZones.value : [];  // Asegúrate de que sea un array
    this.selectedZoneIds = selectedZones.map((zone: any) => zone.id);  // Extraemos los ids de las zonas
    console.log('Ids de las zonas seleccionadas:', this.selectedZoneIds);
  }

  onZonesExtSelected() {
    const selectedZonesExt: any[] = Array.isArray(this.myControlZonesExt.value) ? this.myControlZonesExt.value : [];  // Asegúrate de que sea un array
    this.selectedZoneExtIds = selectedZonesExt.map((zone: any) => zone.id);  // Extraemos los ids de las zonas
    console.log('Ids de las zonas seleccionadas:', this.selectedZoneExtIds);
  }

  // Función de filtrado
  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.suppliers.filter((supplier) =>
      supplier.name.toLowerCase().includes(filterValue)
    );
  }

  private _filterZones(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.zones.filter((zone) =>
      zone.name.toLowerCase().includes(filterValue)
    );
  }

  private _filterTypesMessages(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.typesMessages.filter((typesMessages) =>
      typesMessages.name.toLowerCase().includes(filterValue)
    );
  }

  sendMessage() {
    // Lógica para enviar el mensaje
    console.log('Mensaje enviado'); // Aquí puedes agregar tu lógica de envío.

    this.suppliesService.sendMessage(this.supplieid,
            this.selectedZoneIds, this.selectedZoneExtIds, this.send_message).subscribe((data) => {
      console.log(data); // Cargar datos en la lista completa
    });

    // Mostrar la alerta
    this.snackBar.open('Mensaje enviado con éxito', 'Cerrar', {
      duration: 3000, // La alerta desaparecerá después de 3 segundos
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
