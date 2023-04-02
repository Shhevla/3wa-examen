import { Timestamp } from "firebase/firestore";

// export class Appointment {
//     constructor(public firstName:string, public lastName:string, public title:string, 
//                 public startTime:string, public endTime:string, public description:string, public color:string, public day:string,
//                 public startCoordinate:number, public endCoordinate:number, public startTimeToDisplay: string, public endTimeToDisplay: string, public isPermanent: string) {} 
//                 // faire un tableau pour toute les variables sur le temps.
// }

export interface Appointment {
    basicInfos: BasicInformations;
    practitioner: string;
    date: HoursInformations;
    reccurences: DateReccurences;
    notes?: string;
}

export interface BasicInformations {
    firstName: string;
    lastName: string;
    phone: string;
    mail: string;
    address: string;
    zipCode: string;
    city: string;
}

export interface HoursInformations {
    day: string;
    startTime: string;
    endTime: string;
}

export interface DateReccurences {
    daysList: Array<boolean>;
    startDate: string;
    endDate: string;
}