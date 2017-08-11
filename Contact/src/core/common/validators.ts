import { FormControl } from '@angular/forms';

export function nameValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/)) {
    return { invalidName: true };
  }
}
export function mailValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/)) {
    return { invalidMail: true };
  }
}
export function mobileValidator(control: FormControl):{ [s: string]: boolean}{
  if(!control.value.match(/([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/)){
    return { invalidMobile: true };
  }
}

