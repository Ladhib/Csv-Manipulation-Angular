import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  SharedData: any 
  public dataSource = new BehaviorSubject<[]>([]);
  data = this.dataSource.asObservable();

  constructor( public http :HttpClient ) { }
  baseURL= environment.baseURL


  updatedDataSelection(data:any){
    this.dataSource.next(data);

  }


  manMatch(data : any)
  {
    return this.http.post( this.baseURL + '/expensya/manMatch', data)
  }

  translateData(data : any){
    return this.http.post(this.baseURL + '/expensya/translate' , data )
  }

  autoMatchTranslatedKeys(data : any){
    return this.http.post(this.baseURL + '/expensya/autoMatchTran' , data )
  }

  autoMatchInitKeys(data : any){
    return this.http.post(this.baseURL + '/expensya/autoMatchInit' , data )
  }

  getMemoKeys(){
    return this.http.get(this.baseURL+'/expensya/getMemoKeys')
  }
  saveKeys(data:any){
    return this.http.post(this.baseURL + '/expensya/saveKeys' , data )
  }

  getCsvFile(){
    return this.http.get(this.baseURL+'/expensya/getCsvFile')
  }
  getSimilarity(data:any){
    return this.http.post(this.baseURL+'/expensya/getSimilarity' , data)
  }
  updateMemoKey(id:any,updatedMemoKeys:any){
      return this.http.put(this.baseURL +'/expensya/updateMemoKeys/'+ id,updatedMemoKeys)
    }
}
