import { IDbObject} from 'db-repository';

export interface DbReview extends IDbObject {
    text: string;
};