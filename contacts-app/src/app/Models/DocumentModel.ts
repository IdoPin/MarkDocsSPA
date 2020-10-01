import { UserModel } from './UserModel'

export class DocumentModel {

    DocID:string
    UserID:string
    DocumentName:string
    ImageURL:string
    Members:UserModel[]=[]

    constructor(docID:string,userID:string,docName:string,imgUrl:string,){
        this.DocID = docID
        this.UserID = userID
        this.DocumentName = docName
        this.ImageURL = imgUrl
    }
}
