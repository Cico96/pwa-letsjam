import { Instrument } from "./instrument";
import { Song } from "./song";

export interface MusicSheet {

    id: number;
    title: string;
    author: string;
    verified: boolean;
    visibility: boolean;
    rearranged: boolean;
    hasTablature: boolean;
    song: Song;
    likes: number;
    instruments: Array<Instrument>;
    createDateTime: Date;
    updateDateTime: Date;
}
