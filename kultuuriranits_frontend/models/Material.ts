import { Program } from "./Program"

export interface Material {
    id: number,
    name: string,
    fileType: string,
    title: string
    program: Program
}