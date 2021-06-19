import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class translate {

  constructor( public http :HttpClient ) { }
  baseURL= environment.baseURL


  aa(data : any)
  {
    return this.http.post( this.baseURL + '/index/translateHeader',data)
   
  }
}

// header = true
// csvRecords: any = [];
// @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

// fileChangeListener($event: any): void {


//   // Select the files from the event
//   const files = $event.srcElement.files;

//   // Parse the file you want to select for the operation along with the configuration
//   this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
//     .pipe().subscribe((result) => {

//       console.log('Result', result);
//       this.csvRecords = result;
//     }, (error: NgxCSVParserError) => {
//       console.log('Error', error);
//     });

    
// }