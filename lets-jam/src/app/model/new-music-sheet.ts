import { NewMusicSheetSong } from './new-music-sheet-song';
import { User } from './user';

export interface NewMusicSheet {
    title: string;
    author: string;
    visibility: boolean;
    rearranged: boolean;
    content: string;
    user: User;
    song: NewMusicSheetSong;
}
