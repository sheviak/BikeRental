import { Injectable, Inject } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
  
export class ErrorService {

    public getError(error): string{
        let errors: string = "";
        switch(error.status){
            case 400: // validation error
              let map = new Map<string, string[]>();
    
              if(error.error.ValidationErrors != null){
                for (var value in error.error.ValidationErrors) {  
                    map.set(value, error.error.ValidationErrors[value])  
                }  
              } else {
                for (var value in error.error) {  
                  map.set(value, error.error[value])  
                }  
              }
    
              for (let [key, value] of map.entries()) {
                value.forEach(element => { errors += `${element}\n`;  });
                errors += `\n`;
              }
            break;
            case 401: // when send don't corrent data
              errors = error.error.message;
              break;
            case 404: // not found
              alert("This bike is not found!");
            break;
            case 500: // server error
                alert("Ops! An error occurred on the server...");
            break;
            default:
                alert("Ops! An unexpected error...");
                break;
        }

        return errors;
    }

  }