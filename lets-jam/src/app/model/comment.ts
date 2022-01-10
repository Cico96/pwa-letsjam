import { MusicSheet } from "./music-sheet";
import { User } from "./user";

export class Comment {

    private id: number;
    private content: string;
    private parentComment: Comment;
    private musicSheet: MusicSheet;
    private user: User;

    constructor(id: number,content: string, parentComment: Comment, musicSheet: MusicSheet, user: User) {

        this.id = id;
        this.content = content;
        this.parentComment = parentComment;
        this.musicSheet = musicSheet;
        this.user = user;
    }
}
