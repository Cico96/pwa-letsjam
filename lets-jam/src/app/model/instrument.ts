import { MusicSheet } from "./music-sheet";

export class Instrument {

    private id: number;
    private name: string;
    private instrumentKey: string;
    private musicSheets: MusicSheet[];

    constructor(id: number, name: string, instrumentKey: string, musicSheets: MusicSheet[]) {

        this.id = id;
        this.name = name;
        this.instrumentKey = instrumentKey;
        this.musicSheets = musicSheets;
    }
}
