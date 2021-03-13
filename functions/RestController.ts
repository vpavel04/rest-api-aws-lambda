
import * as db from 'db-repository';
import * as aws from './aws.lambda.interfaces';

export class RestController<T extends db.IDbObject> {
    repo: db.IRepository<T>;
    pathKey: string;

    public constructor(repo: db.IRepository<T>, pathKey: string) {
        this.repo = repo;
        this.pathKey = pathKey;
    }
    public createResponse(): aws.LambdaReturn {
        return {
            statusCode: undefined,
            headers: {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            }
        };
    }
    public async get(event: aws.LambdaEvent, context: aws.LambdaContext): Promise<aws.LambdaReturn> {
        const ret: aws.LambdaReturn = this.createResponse();

        try {
            const id = event.pathParameters ? event.pathParameters[this.pathKey] : null;
            const query: db.IQuery = id ? db.query().byId(id) : db.query().all();
            const result: T[] = await this.repo.list(query);

            if (result.length === 0) {
                ret.statusCode = 404;
            } else {
                ret.statusCode = 200;
                ret.body = JSON.stringify(result);
            }
        } catch (err) {
            console.error(err);
            ret.statusCode = 500;
        }
        return ret;
    }

    public async update(event: aws.LambdaEvent, context: aws.LambdaContext): Promise<aws.LambdaReturn> {
        const ret: aws.LambdaReturn = this.createResponse();

        try {
            const id = event.pathParameters ? event.pathParameters[this.pathKey] : null;
            const obj: T = Object.assign({ _id: id }, JSON.parse(event.body));
            const result: number = await this.repo.update(obj);
            if (result === 0) {
                ret.statusCode = 304;
            } else {
                ret.statusCode = 200;
            }
        } catch (err) {
            console.error(err);
            ret.statusCode = 500;
        }
        return ret;
    }

    public async add(event: aws.LambdaEvent, context: aws.LambdaContext): Promise<aws.LambdaReturn> {
        const ret: aws.LambdaReturn = this.createResponse();

        try {
            const rev: T = JSON.parse(event.body);
            await this.repo.add(rev);
            ret.statusCode = 200;
            ret.body = JSON.stringify(rev);
        } catch (err) {
            console.error(err);
            ret.statusCode = 500;
        }
        return ret;
    }

    public async del(event: aws.LambdaEvent, context: aws.LambdaContext): Promise<aws.LambdaReturn> {
        const ret: aws.LambdaReturn = this.createResponse();

        try {
            const id = event.pathParameters ? event.pathParameters[this.pathKey] : null;
            const query: db.IQuery = id === 'all' ? db.query().all() : db.query().byId(id);
            const result: number = await this.repo.remove(query);
            if (result === 0) {
                ret.statusCode = 404;
            } else {
                ret.statusCode = 200;
            }
        } catch (err) {
            console.error(err);
            ret.statusCode = 500;
        }
        return ret;
    };
}