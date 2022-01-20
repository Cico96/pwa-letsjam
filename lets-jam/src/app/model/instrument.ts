import { MusicSheet } from "./music-sheet";

export interface Instrument {

    id: number;
    name: string;
    instrumentKey: string;
    musicSheets: MusicSheet[];

}
