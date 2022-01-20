import { Instrument } from "./instrument";
import { Song } from "./song";
import { User } from "./user";

export interface MusicSheet {

    id: number;
    title: string;
    author: string;
    verified: boolean;
    visibility: boolean;
    rearranged: boolean;
    hasTablature: boolean;
    song: Song;
    user: User;
    likes: User[];
    instruments: Instrument[];

}
