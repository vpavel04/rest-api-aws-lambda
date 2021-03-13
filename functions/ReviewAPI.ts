
import * as db from 'db-repository';
import * as mongoDbRepo from 'db-repository-mongo';
import { DbReview } from './DbReview';
import { RestController } from './RestController';
import * as aws from './aws.lambda.interfaces';

db.use(mongoDbRepo.init());

// define controller for DbReview
class ReviewController extends RestController<DbReview> {
    constructor(repo: db.IRepository<DbReview>) {
        super(repo, 'review_id');
    }
}

// initialize repo
const repo = db.repo<DbReview>({ table: 'Review' });
const reviewController: ReviewController = new ReviewController(repo);

// export lambda functions
export const get: aws.LambdaFn = async (ev, ctx) => reviewController.get(ev, ctx);
export const update: aws.LambdaFn = async (ev, ctx) => reviewController.update(ev, ctx);
export const add: aws.LambdaFn = async (ev, ctx) => reviewController.add(ev, ctx);
export const del: aws.LambdaFn = async (ev, ctx) => reviewController.del(ev, ctx);
