import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from '../services/services.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ManMatchingDialogComponent } from '../man-matching-dialog/man-matching-dialog.component';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser'
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matchng-page',
  templateUrl: './matchng-page.component.html',
  styleUrls: ['./matchng-page.component.css']
})
export class MatchngPageComponent implements OnInit {
  similarity: any;
  table(table: any) {
    throw new Error('Method not implemented.');
  }


  constructor(public service: ServicesService, public dialog: MatDialog, private ngxCsvParser: NgxCsvParser, private spinner: NgxSpinnerService,public router:Router) { }
  ManuelleMatching: any
  autoMatching: any
  allUsers: any
  allUsersLength: any
  systemKeys: any
  memoKeys : any
  successAlert = false
  FailAlert = false

  ngOnInit() {
    this.systemKeys = [
      'id',
      'firstname',
      'lastname',
      'email',
      'gender',
      'Adresse_IP'
    ];
    this.allUsers = []

    this.ManuelleMatching = false
    this.autoMatching = true

    this.service.getCsvFile().subscribe(res => {
      console.log(res);
      this.allUsers = res

    })
    console.log(this.allUsers);
    this.allUsersLength = this.allUsers.length

    this.service.getMemoKeys().subscribe((res) => {
      console.log(res);
      this.memoKeys = res;
    });
  }
  csvContent: any;
  contacts = [] as any
  fileKeys: any

  flag: boolean = false;
  prop = [] as any

  public records: any[] = [];
  @ViewChild('csvReader') csvReader: any;

  files: any
  uploadListener($event: any): void {
    let text = [];
    this.files = $event.srcElement.files;
    if (this.isValidCSVFile(this.files[0])) {
      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        let headersRow = this.getHeaderArray(csvRecordsArray);
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      };
      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };
    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        csvArr.push(csvRecordsArray);
      }
    }
    return csvArr;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  headerArray = [] as any
  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    for (let j = 0; j < headers.length; j++) {
      this.headerArray.push(headers[j])
    }
    console.log(this.headerArray);
    this.fileKeys = Object.keys(this.csvRecords[0])
    console.log(this.fileKeys);


    return this.headerArray;

  }
  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.records = [];
  }

  header = true
  csvRecords: any
  fil: any

  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;
  event: any
  fileChangeListener($event: any): void {
    this.event = $event
    const files = $event.srcElement.files;
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result) => {
        this.fil = result
console.log(this.fil);
this.service.updatedDataSelection(result);

this.service.SharedData=result
        console.log('Result', result);

        this.csvRecords = result;


      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });

  }
  headersTranslatedTab: any[] = [];


  translateHeaders() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 6000);
    this.headerArray.forEach((element: any, i: any) => {
      var aa = this.headerArray[i]
      var translatedHeader = { aa }
      this.service.translateData(translatedHeader).subscribe((res: any) => {
        this.headersTranslatedTab.push(res)
      },
        err => { console.log(err) },
        () => {
      
        }
      )
    });

    setTimeout(() => {
      this.preprocessData(this.headersTranslatedTab)
    }, 3000);
  }

  preprocessData(headersTranslatedTab: any) {

    var headersTranslatedTab2: any[] = []
    headersTranslatedTab.forEach((element: any) => {
      var elementModified = element.dataT.replace(/ /g, "_")
      headersTranslatedTab2.push({ dataT: elementModified, data: element.data })
    })

    this.csvRecords.forEach((element: any, i: any) => {
      Object.keys(element).forEach((key, j) => {
        var keyT = headersTranslatedTab2[j].dataT // lastname
        var initKey = headersTranslatedTab2[j].data // nom_de_famille
        var propertyFound = Object.keys(element).find((property: any) => property == initKey) || ""
        if (propertyFound != keyT) {
          element[keyT] = element[propertyFound]
          delete element[propertyFound]
        }
      })
    })

    this.ngOnInit

  }
  isNotValidFile = false
  csvFileNotTran : any
  autoMatch() {
    this.csvRecords.forEach((element: any) => {
      var data = {file:element,memoKeys:this.memoKeys}
      this.service.autoMatchTranslatedKeys(data).subscribe(res => { console.log(res)},
        err => {
          console.log(err);
          this.isNotValidFile  = true
          this.fileChangeListener(this.event)
        },
        ()=>{this.successAlert=true }

      )
    });
    setTimeout(() => {
      if (this.isNotValidFile == true){
          var  data = this.service.dataSource
          data.subscribe((value) => { 
            this.csvFileNotTran = value 
            console.log(value); 
            console.log(this.csvFileNotTran);        
          });
            this.csvFileNotTran.forEach((element:any) => {
              var data = {file:element,memoKeys:this.memoKeys}
              this.service.autoMatchInitKeys(data).subscribe(res => { console.log(res) },
            err => {
              console.log(err);
              this.ManuelleMatching = true
              this.autoMatching = false
              this.FailAlert=true
            },
            ()=>{this.successAlert=true }
          )
            });

         
       
      
      }

    }, 2000);



  }

  headersSimilarityTab: any[] = []
 openDialog() {
 this.fileChangeListener(this.event)

 var  fileInitial = this.service.dataSource
 fileInitial.subscribe((value) => { 
   this.csvFileNotTran = value 
   console.log(value); 
    console.log(this.csvRecords);
    console.log(this.csvFileNotTran);
 })

    this.headersTranslatedTab.forEach((element: any, i: any) => {
      var header = { dataT:this.headersTranslatedTab[i].dataT,
        data:this.headersTranslatedTab[i].dataT
       }
      this.service.getSimilarity(header).subscribe(res => {
        this.headersSimilarityTab.push(res)
      })

    });
    console.log(this.headersSimilarityTab);

   

    
    setTimeout(() => {
      const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      table: this.headerArray,
      files: JSON.stringify(this.csvFileNotTran),
      similarity: this.headersSimilarityTab
    }
      this.dialog.open(ManMatchingDialogComponent, dialogConfig);

    }, 2000);

  }
  redirectUsers(){
    this.router.navigateByUrl("UsersList")
  }

}


