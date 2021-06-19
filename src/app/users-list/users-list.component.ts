import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(public service: ServicesService) { }
  allUsers : any
  ngOnInit(): void {
    this.service.getCsvFile().subscribe(res => {
      console.log(res);
      this.allUsers = res

    })
  }

}
