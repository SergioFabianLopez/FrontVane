import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { SendMessageComponent } from "../send-message/send-message.component";

import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-main',
  imports: [MatTabsModule, SendMessageComponent, MatToolbarModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
