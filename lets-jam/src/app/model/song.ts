import { Genre } from "./genre";

export interface Song {

    id?: number;
    spotifyId?: string;
    author: string;
    title: string;
    albumName?: string;
    albumType?: string;
    image?: string;
    isExplicit: boolean;
    duration: number;
    lyrics?: string;
    genre: Genre;
}
