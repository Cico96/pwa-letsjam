export interface User {
    
    id?: number;
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
    role?: User.RoleEnum;
    avatar?: string;
}

export namespace User {
    export type RoleEnum = 'UTENTE' | 'AMMINISTRATORE';
    export const RoleEnum = {
        UTENTE: 'UTENTE' as RoleEnum,
        AMMINISTRATORE: 'AMMINISTRATORE' as RoleEnum
    };
}
