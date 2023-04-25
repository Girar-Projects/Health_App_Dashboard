import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { increment } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CustomersService implements OnInit {
  path: string = '';
  settingData: any;
  constructor(
    public authService: AuthService,
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {
    this.auth.authState.subscribe((user) => {
      let uid = user?.uid
      this.getSingleCustomer(uid).subscribe((response)=>{
        let data:any=response.data()
        this.getSingleSetting(data.companyId).subscribe({
          next: (res) => {
  
  
            if (res.docs.length == 0) {
  
              console.log("THe REMINDERS SETTING IS MISSING FOR THIS ACCOUNT!")
              this.initialFetch()
  
            } else {
              res.docs.forEach(doc => {
  
                let settingData: any = doc.data()
                settingData['uid'] = doc.id;
                
                this.settingData = settingData;
                this.authService.setSetting(settingData)
              })
            }
  
          },
          error: (error) => {
            console.log("error")
          }})
      })
     
    })


    this.authService.castSetting.subscribe((result) => {
      this.settingData = result;
      this.path = 'ET_Reminders/' + this.settingData.companyId + '/';



    });
  }

  async ngOnInit() {

  }

  initialFetch(){
    this.auth.authState.subscribe((user) => {
      let uid = user?.uid
      this.getSingleCustomer(uid).subscribe((response)=>{
        let data:any=response.data()
      
        this.getSingleSetting(data.companyId).subscribe({
          next: (res) => {
  
  
            if (res.docs.length == 0) {
  
              console.log("THe REMINDERS SETTING IS MISSING FOR THIS ACCOUNT!")
              this.initialFetch()
            } else {
              res.docs.forEach(doc => {
  
                let settingData: any = doc.data()
                settingData['uid'] = doc.id;
                this.settingData = settingData;
                this.authService.setSetting(settingData)
              })
            }
  
          },
          error: (error) => {
            console.log("error")
          }})
      })
 
    })


    this.authService.castSetting.subscribe((result) => {
      this.settingData = result;
      this.path = 'ET_Reminders/' + this.settingData.companyId + '/';



    });
  }

  

  updateSetting(id: any) {
    this.getSingleSetting(id).subscribe(res => {
      if (res.docs.length !== 0) {
        res.docs.forEach(doc => {
          let settingData: any = doc.data()
          settingData['uid'] = doc.id;
          this.authService.setSetting(settingData)
        })
      }
    })
  }

  updateSettingData(settingId:any,data:any){
    return this.firestore.collection("ET_Reminders").doc(settingId).update(data);

  }



  getCustomers(id: any) {
    return this.firestore.collection("ET_Reminders/" + id + "/Customers").get();
  }


  addNewCustomer(data: any) {
    let dataSent=data
    console.log('THis setting data', this.settingData.companyId);
    return this.firestore.collection("ET_Reminders/" + this.settingData.companyId + '/Customers').add(dataSent);
  }


  getSingleCustomer(id: any) {
    return this.firestore.collection('users').doc(id).get();

  }

  updateMember(settingId: any, id: any, data: any) {
    return this.firestore.collection("ET_Reminders/" + settingId + "/Customers").doc(id).update(data);
  }



  getSingleSetting(id: any) {


 

    return this.firestore
      .collection('ET_Reminders', (ref) => ref.where('companyId', '==', id))
      .get();
  }







  addNewTemplate(data: any) {

    console.log('THis setting data', this.settingData.companyId);
    return this.firestore.collection("ET_Reminders/" + this.settingData.companyId + '/Templates').add(data);
  }


  getTemplates(id: any) {
    return this.firestore.collection("ET_Reminders/" + id + "/Templates").get();
  }

  addNewPhases(data: any) {

    console.log('THis setting data', this.settingData.companyId);
    return this.firestore.collection("ET_Reminders/" + this.settingData.companyId + '/Phases').add(data);
  }

  getPhases(id: any) {
  
    return this.firestore.collection("ET_Reminders/" + id + "/Phases").get();
  }

  deletePhase(settingId: any, id: any) {
    return this.firestore.collection("ET_Reminders/" + settingId + "/Phases").doc(id).delete();

  }


  deleteTemplates(settingId: any, id: any) {
   
    return this.firestore.collection("ET_Reminders/" + settingId + "/Templates").doc(id).delete();
  }

  updateTemplates(settingId: any, id: any, data: any) {

    return this.firestore.collection("ET_Reminders/" + settingId + "/Templates").doc(id).set(data);
  }

  updatePhases(settingId: any, id: any, data: any) {

    return this.firestore.collection("ET_Reminders/" + settingId + "/Phases").doc(id).set(data);
  }


}
