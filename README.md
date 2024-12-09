<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash

# Database 
MongoDB

# .env
PORT=
MONGO_URL=
JWT_SECRET=

$ npm install

# Call api create user collection before login (One time)
METHOD POST => endpoint_backend/users/register
BODY {
  "username": "",
  "password": ""
}

# Call api create community collection before create blog (One time)
METHOD POST => endpoint_backend/community

```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Application architecture


<img src="https://s3-surf.s3.ap-southeast-1.amazonaws.com/data_wow/data_wow.webp?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0xIkcwRQIgRx0SdkQ5j3hCsIG%2Bm4FS2RQTcXHx6wt98ZnIzUxVk9kCIQDT%2BdlH5BPYx4Q5Ksfb9zs%2FFu74K9ZZQ7%2BAaX5w1udUgCrLAwhuEAAaDDQxNzg0ODI1MzE3MyIMtC4bbx0NP9LTGimOKqgDrTA076RaYgWI3PWiYgTjqBukCGTTtB9%2BjiVzZclI8c0KqIrafI4YefupBueQV72W4s9Lys0hdkulCIVGdDiNTCbATFLAUIljBjXnOD%2FmfCti%2BPIQ3zljzpM8UsZ7YiwFqPQEqMrHveWfjef5m6YWwb5T7YRWxWoBig3kh6kuHGLyCO50KqJ%2F6rGnOrZgHPCWG8L09Ga1WQwriVDNCPoUYoY5uW61zl%2Bg5ky1y0ePN4lxLfsO8qrZ%2FIQZs0qyiOzvL7FJP1yqFTprWC3d4XXJ%2BI8Um2M5B4QabQ5lOMsWxALaqTWS7RpELTDNuJ35oJTjf8hI2IxWCSh%2BRlaSCYEIoFa5VEdzT0tfJ10blZv9wYp4FLdH%2F8ygVCgsuM7tReRa8SY2NnT2gwgErIzD4gKA9DtkGHcddDHb7qFvshRYUSEkEjoZolj7%2B2yc8CqkBxxZD7o%2FBABKM%2BY95jrdM8gRva80wZCP1i5fY1f7UwAAKWwdZFlodrmVm8pVd%2BI7eNBwphdW5a2bgVgBvVZ%2FD%2F01N9YO4dKfFxag3ZrLPwPTLLGWZ40Avg7%2F9jD%2B5dm6BjrkAut0vKE9pge4VPKu9n2M5gQzAFilOav7SQVBf%2BrKA6tt6mgLsDMJqKx9BSQ1K7nSZf1c9vLz3oQHalwWjMUEIq%2FuoCQTnWEpk0gQjqXJrqpAB4MuYmSip3WLIWhKMe6iUyKfWbT0dCWau0vIaA1DlZJ9LtVtbzTmy9TGwHPigebKJxLPlTEn%2Bz5msnwGYbug17ZNlpkAazopPaPjtYLH5uwv0cRjGcc2a63pYWxI39JnaBR4Yu3%2B786d%2ByCjZ%2Bloi89u0oqtpw1G461uP6Iz1NXsmkJzSaKryz%2BFpfty9Y2VjJB3HAFwToXB30LKsfQwIaDcyJPQFGzkgx0Eb0SLHZvBlQgTOeD%2Bp635hft%2BwEwjzxAaL9yXKc1gOoxl8DbQVwShEpx3TdRUC1CZnMc%2BwkaGpXgjl0nnyXqgdLOp1iwBYUA%2FHJp3CggR%2FORKM8kefkfwNUr4UwdR41UaicJwsUuXd%2FUF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAWCSNSLL2WTDVQDOE%2F20241209%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20241209T043551Z&X-Amz-Expires=43200&X-Amz-SignedHeaders=host&X-Amz-Signature=565794af729f0a817fa1d5997616b484d5aad7abd542ece4a8e0e370f742280e" alt="Backers on Open Collective" />


## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
