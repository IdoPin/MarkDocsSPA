export class MarkerModel {

    DocID:string
    MarkerID:string 
    UserID:string 
    MarkerType:string 
    StrokeColor:string 
    BackgroundColor:string 
    X:string 
    Y:string 
    XRadius:string 
    YRadius:string 

    constructor(docID:string,markerID:string,userID:string,markerType:string,strokeColor:string,
        backgroundColor:string,x:string,y:string,xRadius:string,yRadius:string){
            this.DocID = docID
            this.MarkerID = markerID
            this.UserID = userID
            this.MarkerType = markerType
            this.StrokeColor = strokeColor
            this.BackgroundColor = backgroundColor
            this.X = x
            this.Y = y
            this.XRadius = xRadius
            this.YRadius = yRadius
        }
}
