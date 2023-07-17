import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-hibajegyfeldolgozasa',
  templateUrl: './hibajegyfeldolgozasa.component.html',
  styleUrls: ['./hibajegyfeldolgozasa.component.css']
})
export class HibajegyfeldolgozasaComponent {
constructor(public router:Router, private search:SearchService){}
}
