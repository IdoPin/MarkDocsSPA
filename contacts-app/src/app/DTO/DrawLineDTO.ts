export class DrawLineDTO {

    DocID:string
    UserID:string
    X1:string
    Y1:string
    X2:string
    Y2:string
    constructor(jsonStr: string) {
        let jsonObj: any = JSON.parse(jsonStr);
        for (let prop in jsonObj) {
            this[prop] = jsonObj[prop];
        }
    }

}
