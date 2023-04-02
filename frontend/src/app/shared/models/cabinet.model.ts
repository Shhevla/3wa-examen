export class Cabinet {
    constructor(public practitioners: Praticiens[], public name: String, public path: String, public invitation: String[]) {}
}

export class Praticiens {
    constructor(public role: String, public id: String | undefined, public color: String, public firstName: String, public lastName: String) {}
}
