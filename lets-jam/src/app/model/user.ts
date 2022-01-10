import { Genre } from "./genre";
import { Instrument } from "./instrument";
import { MusicSheet } from "./music-sheet";

export class User {
    
    private id: number;
    private firstname: string;
    private lastname: string;
    private username: string;
    private role: any;
    private email: string;
    private password: string;
    private avatar: string;   
    private likedMusicSheets: MusicSheet[];
    private preferredGenres: Genre[];
    private preferredInstruments: Instrument[];

    constructor(
        id: number,
        firstname: string,
        lastname: string,
        username: string,
        role: any,
        email: string,
        password: string,
        avatar: string,
        likedMusicSheets: MusicSheet[],
        preferredGenres: Genre[],
        preferredInstruments: Instrument[]) {

            this.id = id;
            this.firstname = firstname;
            this.lastname = lastname;
            this.username = username;
            this.role = role;
            this.email = email;
            this.password = password;
            this.avatar = avatar;
            this.likedMusicSheets = likedMusicSheets;
            this.preferredGenres = preferredGenres;
            this.preferredInstruments = preferredInstruments;
    }
}
