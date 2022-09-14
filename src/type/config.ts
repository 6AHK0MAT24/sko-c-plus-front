import {Camera} from "./camera";

export interface Config {
    n_threads: number,
    w_meters: number,
    h_meters: number,
    w_pixels: number,
    h_pixels: number,
    cameras: Camera[],
    output: string
}
