import { Instrument } from "./instrument";
import { Song } from "./song";
import { User } from "./user";

export class MusicSheet {

    private id: number;
    private title: string;
    private author: string;
    private verified: boolean;
    private visibility: boolean;
    private rearranged: boolean;
    private hasTablature: boolean;
    private song: Song;
    private user: User;
    private likes: User[];
    private instruments: Instrument[];

    constructor(
        id: number,
        title: string,
        author: string,
        verified: boolean,
        visibility: boolean,
        rearranged: boolean,
        hasTablature: boolean,
        song: Song,
        user: User,
        likes: User[],
        instruments: Instrument[]) {
            
            this.id = id;
            this.title = title;
            this.author = author;
            this.verified = verified;
            this.visibility = visibility;
            this.rearranged = rearranged;
            this.hasTablature = hasTablature;
            this.song = song;
            this.user = user;
            this.likes = likes;
            this.instruments = instruments;
    }
}
