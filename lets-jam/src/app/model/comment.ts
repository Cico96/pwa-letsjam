import { MusicSheet } from "./music-sheet";
import { User } from "./user";

export interface Comment {

    id: number;
    content: string;
    parentComment: Comment;
    musicSheet: MusicSheet;
    user: User;

}
