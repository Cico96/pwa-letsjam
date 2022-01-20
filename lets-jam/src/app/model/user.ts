import { Genre } from "./genre";
import { Instrument } from "./instrument";
import { MusicSheet } from "./music-sheet";

export interface User {
    
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    role: any;
    email: string;
    password: string;
    avatar: string;   
    likedMusicSheets: MusicSheet[];
    preferredGenres: Genre[];
    preferredInstruments: Instrument[];
}
