import { Program } from "./Program";
import { Person } from "./Person";

export interface Favorites {
    id: number;

    person: Person;
    program: Program;
}