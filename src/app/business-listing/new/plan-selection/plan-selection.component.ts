import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { getbusinessListingBasicDetails, State } from '../state/business-listing.reducer';
import * as BusinessListingActions from '../state/business-listing.actions'
import uikit from 'uikit';

@Component({
  selector: 'app-plan-selection',
  templateUrl: './plan-selection.component.html',
  styleUrls: ['./plan-selection.component.css']
})
export class PlanSelectionComponent implements OnInit {

  selectedPlan=""
  constructor(private store: Store<State>,private _router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {

    this.store.select(getbusinessListingBasicDetails).subscribe(
      businessListingBasicDetails => {
        console.log("getbusinessListingBasicDetails")

        if (businessListingBasicDetails) {

          console.log("businessListingPlan step")
          console.log(businessListingBasicDetails.businessListingStep)

          if (businessListingBasicDetails.businessListingStep != 'plan') {
            this._router.navigate(['/dashboard/business-listing/new/' + businessListingBasicDetails.businessListingStep]);
          }
        }
      }
    )
  }
  
  savePlan() {
    
      
        this.store.dispatch(BusinessListingActions.saveBusinessListingPlan({ businessListingPlan:{plan: this.selectedPlan} }))
        this.store.dispatch(BusinessListingActions.changeBusinessListingStep({ businessListingStep: 'extra-details' }))
        this.toastr.success("Business Plans Successfully Selected", );
        
      
    }

    selectPlan(plan){
      uikit.modal('#modal-example').show()
      this.selectedPlan = plan

    }
  
}