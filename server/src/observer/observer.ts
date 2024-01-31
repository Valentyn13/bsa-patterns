import { randomUUID } from "crypto";
import { write } from "../helpers/file.helpers";

type Events = 'info' | 'warning'| 'error'

export interface ILogInputData {
    initiator:string,
    eventType:Events,
    message:string,
}

export interface IObserver {
    id:string
    log(data: ILogInputData):void
}

class ConsoleObserver implements IObserver {

    id:string;

    constructor(){
        this.id = randomUUID()
    }

    public log(data:ILogInputData): void {
        const log = this.configureLog(data)
        console.log(log)
    }

    private configureLog(data: ILogInputData){
        const {initiator, eventType, message} = data
        const timeStamp = new Date().toISOString()
        return `${timeStamp}    ${initiator}    ${eventType}    ${message}`
    }

}

class FileObserver implements IObserver {
    id:string
    fileName:string

    constructor(fileName:string){
        this.id = randomUUID()
        this.fileName = fileName
    }

    public log(data: ILogInputData): void {
        const message = this.configureLog(data)
        this.writeToFile(message)
    }

    private configureLog(data: ILogInputData){
        const {initiator, eventType, message} = data
        const timeStamp = new Date().toISOString()
        return `${timeStamp}    ${initiator}    ${eventType}    ${message}\n`
    }

    private writeToFile(message:string){

        write(this.fileName,message)
    }
}
export {ConsoleObserver, FileObserver}