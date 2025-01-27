import { Component } from '@angular/core';
import { MessageComponent } from "../message/message.component";

@Component({
  selector: 'app-homepage',
  imports: [MessageComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
