import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { CustomersService } from '../shared/services/customers.service';
import * as _ from 'lodash';
import { ToasterService } from '../shared/services/toaster.service';

@Component({
  selector:'app-dashboards',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private toaster:ToasterService,
    public afAuth: AngularFireAuth, 
    public router: Router, 
     private customerServices: CustomersService,
    public authService: AuthService,
    public dialog: MatDialog ) {
  }
  isLoading=true;
  stat:any
  range=7
  TotalCount=0
  PendingCount=0
  settings:any[]=[]
  phases:any[]=[]
  customer:any[]=[]
  allCustomers:any[]=[]
  
  ngOnInit(): void {

    this.afAuth.authState.subscribe((res)=>{
      if(res?.emailVerified==false){
        this.router.navigate(['verify-email'])
        this.stat=res.emailVerified
      }else{
        this.customerServices.getSingleCustomer(res?.uid).subscribe((response) => {
          let user: any = response.data()
          this.customerServices.getSingleSetting(user.companyId).subscribe((results) => {

            results.docs.forEach(docs => {

              this.settings = docs.data() as any[]

              this.customerServices.getPhases(docs.id).subscribe((res) => {

                res.docs.forEach((doc: any) => {
                  let phase: any = doc.data()
                  phase['uid'] = doc.id;
                  phase['count']=0

                  this.phases.push(phase);

                },

                );
                
                // this.countPhaseStatus(this.phases)



              })

              this.customerServices.getCustomers(docs.id).subscribe((res) => {
                res.docs.forEach((doc: any) => {
                  this.TotalCount++
                  let data: any = doc.data()
                      
                  data['uid'] = doc.id;

                  data['settingId'] = docs.id;
                  // data['phase'] = doc.data().phase
                  data['phase'] = doc.data().phase ? doc.data().phase : '-';
                  data['fullName'] = doc.data().firstName + " " + doc.data().lastName
                  if(doc.data().phase){
                      this.countPhaseStatus(doc.data().phase)
                  }

                  if(data.date){
                    
                    let today=new Date()
                    let tempDate=new Date(data.date)
                    var diff = tempDate.getTime() - today.getTime();
                    var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
                    data['dateDiff']=diffDays
                    console.log("dateDiff",diffDays)
                //  data
                    // if(diffDays>=0){
                      this.allCustomers.push(data)
                      if(diffDays<=this.range){
                        this.customer.push(data);
                        this.PendingCount++;
                      }
                
              

                
                // }
                
                
                }
                }

                );

                
               
                this.isLoading = false;

  
              })

            

            })
          })
        })
      }
    })

  }

  onChange(event:any){
    this.customer=[]
    this.PendingCount=0;
    for(let customer  in this.allCustomers){

         if(this.allCustomers[customer].dateDiff<=this.range){
          this.customer.push(this.allCustomers[customer]);
          this.PendingCount++;
        }
  
    }


  }

  countPhaseStatus(cusotmerPhase:any){
    for(let i in this.phases){
      if(this.phases[i].phaseTitle==cusotmerPhase){
        this.phases[i].count=this.phases[i].count+1
      }
    }

  }

 
}
