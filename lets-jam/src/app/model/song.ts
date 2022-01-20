import { Genre } from "./genre";

export interface Song {

    id: number;
    author: string;
    title: string;
    albumName: string;
    albumType: string;
    imageUrl: string;
    isExplicit: boolean;
    duration: number;
    lyrics: string;
    spotifyId: string;
    genre: Genre;
}
