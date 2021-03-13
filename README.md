# rest-api-lamda-aws

This is a sample REST API using AWS lambda functions, written in Typescript

## Requirements

* AWS SAM CLI 
* [NodeJS 14.x installed](https://nodejs.org/en/download/)
* [Docker installed](https://www.docker.com/community-edition)

### Building the project
 
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

## Testing
