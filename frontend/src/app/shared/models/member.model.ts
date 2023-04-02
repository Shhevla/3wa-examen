export class Member {
    constructor(public firstName:string, public lastName:string, 
        public invoice:number[], public vitalCard:number, public mutualCard:number,
        public prescription:number, public comments:string, public gender:number,
        public phoneNumber:string, public email:string, public adress:string,
        public notification: DocumentNotification) {}
}

export class DocumentNotification {
    constructor(public documents:number) {}
}