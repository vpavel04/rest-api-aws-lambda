# rest-api-aws-lambda

This is a sample REST API using AWS lambda, written in Typescript

## Requirements

* AWS SAM CLI 
* [NodeJS 14.x](https://nodejs.org/en/download/)
* [Docker](https://www.docker.com/community-edition)

### Build
 
```bash
npm install
cd functions
npm install
cd ..
npm run build
```

### Local development

**Invoking function locally through local API Gateway**

```bash
npm run start
```

Open `http://localhost:3000/review`

### Deploy

```bash
npm run deploy-full
```
