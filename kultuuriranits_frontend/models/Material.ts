import { Program } from "./Program"

export interface Material {
    id: number,
    name: string,
    fileType: string,

    program: Program
}