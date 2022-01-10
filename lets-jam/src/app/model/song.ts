import { Genre } from "./genre";

export class Song {

    private id: number;
    private author: string;
    private title: string;
    private albumName: string;
    private albumType: string;
    private imageUrl: string;
    private isExplicit: boolean;
    private duration: number;
    private lyrics: string;
    private spotifyId: string;
    private genre: Genre;

    constructor(
        id: number,
        author: string,
        title: string,
        albumName: string,
        albumType: string,
        imageUrl: string,
        isExplicit: boolean,
        duration: number,
        lyrics: string,
        spotifyId: string,
        genre: Genre) {

            this.id = id;
            this.author = author;
            this.title = title;
            this.albumName = albumName;
            this.albumType = albumType;
            this.imageUrl = imageUrl;
            this.isExplicit = isExplicit;
            this.duration = duration;
            this.lyrics = lyrics;
            this.spotifyId = spotifyId;
            this.genre = genre;
    }
}
