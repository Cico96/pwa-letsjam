import { User } from "./user";

export interface Comment {

    id: number;
    user: User;
    parentId?: number;
    musicSheetId: number;
    content: string;
    replies: number;
}
