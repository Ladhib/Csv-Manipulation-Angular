import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatchngPageComponent } from '../matchng-page/matchng-page.component';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-man-matching-dialog',
  templateUrl: './man-matching-dialog.component.html',
  styleUrls: ['./man-matching-dialog.component.css'],
})
export class ManMatchingDialogComponent implements OnInit {
  headersData: any;
  file: any;
  percentage:any
  headersSimilarityTab: any;
  fixedSimilarityTab:any=[]
  constructor(
    public dialogRef: MatDialogRef<ManMatchingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: MatchngPageComponent,
    public service: ServicesService
  ) {
    this.headersData = data.table;
    this.file = JSON.parse(data.files);
    this.headersSimilarityTab = data.similarity;
  }
  memoKeys: any;

  ngOnInit(): void {
    console.log(this.headersData);
    console.log(this.file);

    this.headersSimilarityTab.forEach((element: any) => { 
       element.similarity.rating.toFixed(1);
       
      // this.fixedSimilarityTab.push(this.percentage)
    });
// console.log(this.fixedSimilarityTab);


    this.service.getMemoKeys().subscribe((res) => {
      console.log(res);
      this.memoKeys = res;
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
   
  }


  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['id', 'firstname', 'lastname', 'email', 'gender', 'Adresse_IP'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log(this.todo);
      console.log(this.done);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  MatchingTab: any = [];
  newFile: any = [];
  csvKey: any;
  systemKey: any;

  ComfirmMatching() {
    this.headersData.forEach((element: any, i: any) => {
      this.MatchingTab.push({
        systemKey: this.done[i],
        csvKey: this.headersData[i],
      });
    });

    console.log(this.MatchingTab);
    console.log(this.file);

    let data = {
      datta: this.headersData,
      file: this.file,
    };
    console.log(this.MatchingTab);

    this.file.forEach((element: any, i: any) => {
      Object.keys(element).forEach((key, j) => {
        this.csvKey = this.MatchingTab[j].csvKey; // nom de famille
        this.systemKey = this.MatchingTab[j].systemKey; // lastname
        var propertyFound =
          Object.keys(element).find((property: any) => property == this.csvKey) || '';

        if (element[key] != this.csvKey) {
          element[this.systemKey] = element[propertyFound];
          delete element[propertyFound];
        }
      });
    });
console.log(this.file);

    this.file.forEach((element: any) => {
      this.service.manMatch(element).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    });

    setTimeout(() => {
      let matchingTab = {
        matchingTab: this.MatchingTab,
        memoKeys: this.memoKeys,
      };
      let memoKeysUp: any;

      this.service.saveKeys(matchingTab).subscribe(
        (res) => {
          console.log(res);
          memoKeysUp = res;
        },
        (err) => {
          console.log(err);
        },
        () => {
            this.service
              .updateMemoKey(memoKeysUp._id, memoKeysUp)
              .subscribe((res: any) => {
                console.log(res);
              });
        }
      );
    }, 1000);
  }
}
