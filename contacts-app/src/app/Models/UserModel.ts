import { DocumentModel } from "./DocumentModel"

export class UserModel {
    
    UserID:string
    UserName:string
    Documents: DocumentModel[] = []

    constructor(){
    }


}
