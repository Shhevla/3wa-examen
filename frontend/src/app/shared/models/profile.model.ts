export class UserProfile {
    constructor(public information:Information, public cabinet:string[], public subscription:subscription, public cabinet_manager:string, public pending: Pending[]) {}
}
export class subscription{
    constructor(
        public end: string,
        public start: string,
        public data: string
    ){}
}
export class Information {
    constructor(
        public fname: string, 
        public lname: string, 
        public order: string, 
        public order_city: string,
        public adress: string,
        public birthday: string,
        public birth_location: string,
        public siret: string,
        public tel: string,
        public gender: string,
        public dname: string
    ){}
}
export class connection {
    constructor(public response: string) {
    } 
}
export class Pending {
    constructor(public name: string,
                public path: string) {
    } 
}