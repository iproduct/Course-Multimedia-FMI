export class HttpError{
    constructor(public status: number, public message:string, public error: any = undefined) { }
}