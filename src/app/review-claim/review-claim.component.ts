import { LoginServiceService } from './../services/login-service.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review-claim',
  templateUrl: './review-claim.component.html'
})
export class ReviewClaimComponent implements OnInit {

  taskId: string = "";
  caseId: string = "";

  claim = {}
  requesterName: string = "";
  isForReview: string = "false";
  solution: string = "";

  constructor(
    private service: LoginServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.taskId = params['taskId'];
      this.caseId = params['caseId'];
      this.service.getContext(this.taskId).subscribe((context: any) => {
        this.service.getDataModel(context.newClaim_ref.link).subscribe((data: any) => {
          this.claim = data;
        });
      });

      this.service.getCaseVariable(this.caseId, 'contact').subscribe((contact: any) => {
        this.requesterName = this.getProperty(contact.value, "Name");
      })
    });
  }

  submit() {
    let obj;
    if(this.isForReview === "true"){
      obj = {isForReview : this.isForReview === 'true',solution :"" , notes:this.solution}
    }else{
      obj = {isForReview : this.isForReview === 'true' , solution : this.solution , notes:""}
    }
    this.service.asignarCaso(this.taskId).subscribe(resp => {
      this.service.executeTask(this.taskId, obj).subscribe(res => {
        alert(`Operación realizada exitosamente`);
        setTimeout(() => {
          this.router.navigateByUrl("/home");
        }, 2000);
      })
    });
  }

  private getProperty(map: string, searchKey: string) {
    let str = map.replace(/[{}]+/g, ""),
      splitted = str.split(",");
    for (let i = 0; i < splitted.length; i++) {
      let [key, value] = splitted[i].split("=");
      if (key.trim() === searchKey)
        return value.trim();
    }
    return "";
  }

}
