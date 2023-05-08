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
  
              console.log("The App SETTING IS MISSING FOR THIS ACCOUNT!")
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
      this.path = 'Health_App/' + this.settingData.companyId + '/';



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
  
              console.log("The App SETTING IS MISSING FOR THIS ACCOUNT!")
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
      this.path = 'Health_App/' + this.settingData.companyId + '/';



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
    return this.firestore.collection("Health_App").doc(settingId).update(data);

  }



  getCustomers(id: any) {
    return this.firestore.collection("Health_App/" + id + "/Professionals").get();
  }

  getRequests(id: any) {
    return this.firestore.collection("Health_App/" + id + "/Requests").get();
  }

  addNewCustomer(data: any) {
    let dataSent=data
    console.log('THis setting data', this.settingData.companyId);
    return this.firestore.collection("Health_App/" + this.settingData.companyId + '/Professionals').add(dataSent);
  }

addNewRequest(data: any) {
    let dataSent=data
    console.log('THis setting data', this.settingData.companyId);
    return this.firestore.collection("Health_App/" + this.settingData.companyId + '/Requests').add(dataSent);
  }

  getSingleCustomer(id: any) {
    return this.firestore.collection('users').doc(id).get();

  }

  updateMember(settingId: any, id: any, data: any) {
    return this.firestore.collection("Health_App/" + settingId + "/Professionals").doc(id).update(data);
  }



  getSingleSetting(id: any) {


 

    return this.firestore
      .collection('Health_App', (ref) => ref.where('companyId', '==', id))
      .get();
  }







  addNewTemplate(data: any) {

    console.log('THis setting data', this.settingData.companyId);
    return this.firestore.collection("Health_App/" + this.settingData.companyId + '/Templates').add(data);
  }


  getTemplates(id: any) {
    return this.firestore.collection("Health_App/" + id + "/Templates").get();
  }

  addNewPhases(data: any) {

    console.log('THis setting data', this.settingData.companyId);
    return this.firestore.collection("Health_App/" + this.settingData.companyId + '/Phases').add(data);
  }

  getPhases(id: any) {
  
    return this.firestore.collection("Health_App/" + id + "/Phases").get();
  }

  deletePhase(settingId: any, id: any) {
    return this.firestore.collection("Health_App/" + settingId + "/Phases").doc(id).delete();

  }


  deleteTemplates(settingId: any, id: any) {
   
    return this.firestore.collection("Health_App/" + settingId + "/Templates").doc(id).delete();
  }

  updateTemplates(settingId: any, id: any, data: any) {

    return this.firestore.collection("Health_App/" + settingId + "/Templates").doc(id).set(data);
  }

  updatePhases(settingId: any, id: any, data: any) {

    return this.firestore.collection("Health_App/" + settingId + "/Phases").doc(id).set(data);
  }


}
