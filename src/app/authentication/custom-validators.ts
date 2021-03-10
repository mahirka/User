
import { ValidationErrors,AbstractControl,ValidatorFn} from '@angular/forms';

export class CustomValidators {
  
    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
          if (!control.value) {
            // if control is empty return no error
            return null;
          }
      
          // test the value of the control against the regexp supplied
          const valid = regex.test(control.value);
      
          // if true, return no error (no error), else return error passed in the second parameter
          return valid ? null : error;
        };
      }


    static  confirmPasswordValidator(control: AbstractControl) {
        if(control && (control.value !== null || control.value ! == undefined)){
          const confirmPassword = control.value;
    
          const passControl = control.root.get('newpassword');
          if(passControl ){
            const passValue = passControl.value;
            if(passValue !== confirmPassword || passValue === ""){
              return{
                isError:true
              }
            }
          }
        }
      }


      
}
