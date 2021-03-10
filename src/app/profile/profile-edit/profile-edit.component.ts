
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as AppActions from '../../state/app.actions'
import { ImageCroppedEvent } from 'ngx-image-cropper';
import uikit from 'uikit';
import { UpdateProfile } from './profile-edit';
import { getAppState, State } from '../../state/app.reducer';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  updateForm: FormGroup;
  update= new UpdateProfile();
  isConfirmPasswordSame = true;
  errorMessage=null;
  isLoading = false;
  profilePicUrl: any;
  profilePicFile:any;
  profilePicMediaId: any;
  
  isProfilePicCropped = true;
  profilePicChangedEvent: any = '';
  loggedInUserId: string = ""
  loggedInUserName: string = ""
  profilePic: string = ""
  modalProfilePic: string = ""
  
  loggedInUserEmail: string = ""
  loggedInUserMobile : string = ""


  constructor(private toastr: ToastrService ,  private store: Store<State>,private _httpService: HttpService,private fb: FormBuilder,private _router: Router,) { }

  

  ngOnInit(): void {
    this.updateForm= new FormGroup({
      name: new FormControl(this.update.name, [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl(this.update.email, [Validators.required,Validators.pattern("(^$)|(^.*@.*\..*$)")]),
      mobile: new FormControl(this.update.mobile, [Validators.required, Validators.pattern("([0-9]{10,10})+")]),
      userId:new FormControl(null)
    });

    this.store.select(getAppState).subscribe(
      appState => {
        if (appState) {
console.log("getAppState reached")
console.log(appState)

          if (appState.loggedInUserDetails.userId == 'userId') {
            this.getLoggedInUserDetails()
          } else {


            this.loggedInUserId = appState.loggedInUserDetails.userId
            this.loggedInUserName = appState.loggedInUserDetails.name
            this.profilePic = appState.loggedInUserDetails.profilePic
            this.modalProfilePic = appState.loggedInUserDetails.profilePic
            
            this.loggedInUserEmail = appState.loggedInUserDetails.email
            this.loggedInUserMobile = appState.loggedInUserDetails.mobile
            this.profilePicMediaId = appState.loggedInUserDetails.mediaId
            this.initializedFormData()
            console.log("user details appstate reached")
            console.log(this.loggedInUserId)
            console.log(this.loggedInUserName)
            console.log(this.profilePic)
            console.log(this.loggedInUserEmail)
            console.log(this.loggedInUserMobile)
            console.log(this.profilePicMediaId)


            }
        }
      }
    )

}


get name() { return this.updateForm.get('name'); }
get email() { return this.updateForm.get('email'); }
get mobile() { return this.updateForm.get('mobile'); }
get userId() { return this.updateForm.get('userId'); }



save(){
  console.log(this.updateForm);
  console.log('saved: '+ JSON.stringify(this.updateForm.value));
}

submit() {
  
  if(!this.isLoading){
    console.log("not is loading")
    if (this.checkIfFormValid()) {
      console.log("form valid")
      this.updateProfile()
    }
  }

}

getLoggedInUserDetails() {
  this._httpService.getLoggedInUserDetails()
    .subscribe(
      data => {

        console.log("getLoggedInUserDetails")
        console.log(data)
        if (data['userDetails']) {

          this.loggedInUserId = data['userDetails']['id']
          this.loggedInUserName = data['userDetails']['name']
          this.profilePic=data['userDetails']['profilePic']
          this.modalProfilePic=data['userDetails']['profilePic']

          this.loggedInUserEmail=data['userDetails']['email']
          this.loggedInUserMobile=data['userDetails']['mobile']
          this.profilePicMediaId=data['userDetails']['profilePicMediaId']
          this.initializedFormData()
          console.log("user details reached")
              console.log(this.loggedInUserId)
              console.log(this.loggedInUserName)
              console.log(this.profilePicMediaId)
          this.store.dispatch(AppActions.updateLoggedInUserDetails({
            loggedInUserDetails: {
              userId: this.loggedInUserId, name: this.loggedInUserName,profilePic:this.profilePic ,email:this.loggedInUserEmail,mobile:this.loggedInUserMobile,mediaId:this.profilePicMediaId
            }
          }))
        }
          

      },
      error => {
        //this.logout()
        
        
        localStorage.removeItem('tocken');
        this._router.navigate(['/authentication/login']);

        this.toastr.info("Please Login", error.error,);

      },
    );
}
initializedFormData(){
  this.updateForm.get('name').setValue(this.loggedInUserName)
  this.updateForm.get('email').setValue(this.loggedInUserEmail)
  this.updateForm.get('mobile').setValue(this.loggedInUserMobile)
  this.updateForm.get('userId').setValue(this.loggedInUserId)


}
updateProfile() {
   
  console.log("update reached")
  this.errorMessage = null;
  this.isLoading = true;
  this._httpService.updateProfile(this.updateForm.value)
    .subscribe(
      data => {
        console.log("data reached")

        this.isLoading = false;
        if (data['response'] == 'success') {
          //data['tocken']

          this.toastr.success("Success! Your updation is complete");

        }

      },

      error => {
        console.log("errors reached")
        console.log(error)

        this.isLoading = false;
        this.errorMessage = error.error;
      },

    );
}
checkIfFormValid(){
  if (this.updateForm.invalid) {
    
    this.errorMessage = "somthing went wrong !";

    return false;
  }
  
  return true
}

previewProfilePic(event) {
  let selectedFiles: Array<File> = [];
  selectedFiles = <Array<File>>event.target.files;

  if (selectedFiles.length > 1) {
    this.errorMessage = "Please select a single image file"
  } else {

    if (selectedFiles[0].type.match(/video\/*/) == null && selectedFiles[0].type.match(/image\/*/) == null) {
      this.errorMessage = "Please select a single image file"

    } else {

    }

    this.isProfilePicCropped = true;

    this.profilePicChangedEvent = event;
    this.profilePicFile = selectedFiles[0];

  }
}

uploadMedias(usesrId) {

  const formData: any = new FormData();
  formData.append('associatedId', usesrId); //note c
  formData.append('directory', 'users/' + usesrId);

  if (this.profilePic != null) {
    formData.append('profilePic', this.profilePicFile, this.profilePicFile['name']);

  }


  this._httpService.uploadMedia(formData)
    .subscribe(

      data => {

        if (data['response'] == 'success') {
          
          this._router.navigate(['/dashboard/profile/' + usesrId])


          this.toastr.success("Registration Successful", "Welcome to Listnell, " + this.name);
        }

      },

      error => {
        this.errorMessage = error.error + ",Please double check and try again"
      },

    );
}

uploadProfilePic() {
  const formData: any = new FormData();
    formData.append('associatedId', this.loggedInUserId); //note c
    formData.append('mediaId', this.profilePicMediaId);
    formData.append('directory','users/' + this.loggedInUserId);

    if (this.profilePicFile != null) {
      formData.append('profilePic', this.profilePicFile, this.profilePicFile['name']);
      this._httpService.uploadMedia(formData)
      .subscribe(

        data => {

          if (data['response'] == 'success') {
            console.log("profile pic updated")
            this.getLoggedInUserDetails()

            uikit.modal('#modal-upload').hide()
            this.toastr.success("Profile Pic Updated Successfully", "Success");
          }

        },

        error => {


          this.toastr.info("Could you please try again?", error.error,);
        },

      );
    }else{
      this.toastr.info("Please Choose New Profile Pic to upload", "Select a File",);

    }

  
  }
profilePicCropped(event: ImageCroppedEvent) {
console.log("profilePicCropped")

  this.modalProfilePic = event.base64;
  this.isProfilePicCropped = false;
}
imageLoaded() {
  // show cropper
}
cropperReady() {
  // cropper ready
}
loadImageFailed() {
  // show message
}
}
