import { Member } from "./member.model";

export class LocationType {
    constructor(public cityName:string, public members?:Member) {}
}