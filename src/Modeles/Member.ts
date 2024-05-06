import { Evt } from "./Event";
import { Article } from "./Publication";

export interface Member {
    id: string;
    cin: string;
    name: string;
    createdDate:string;
    cv: string;
    type:string;
    tab_pub:Article[];
    tab_evt: Evt[]
}