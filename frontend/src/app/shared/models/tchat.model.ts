export class tchatModel {
    constructor(public text: string, public sending: string, public date: string, public hour:string,public uid: string) {}
}

export class tchatReceive {
    constructor(public worker: string[], public workerNotif: number[],public message: tchatModel[]) {}
}
