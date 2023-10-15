<h1 p align="center">
🎉 Rotowire API Client
</h1>

<p align="center">
    <a href="https://gfay63.github.io/rotowire-api-client/"><b>Documentation & API Specification</b></a>
</p>

<div align="center">

[![npm version](https://img.shields.io/npm/v/rotowire-api-client.svg)](https://www.npmjs.com/package/rotowire-api-client)
[![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=rotowire-api-client&query=$.install.pretty&label=install%20size&style=flat-square)](https://packagephobia.now.sh/result?p=rotowire-api-client)
[![npm downloads](https://img.shields.io/npm/dm/rotowire-api-client.svg?style=flat-square)](https://npm-stat.com/charts.html?package=rotowire-api-client)
[![Known Vulnerabilities](https://snyk.io/test/npm/rotowire-api-client/badge.svg)](https://snyk.io/test/npm/rotowire-api-client)
![GitHub top language](https://img.shields.io/github/languages/top/gfay63/rotowire-api-client)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/gfay63)](https://github.com/sponsors/gfay63)
</div>

Welcome to the comprehensive interface for the Rotowire API Client!

This package provides a seamless integration with the Rotowire API, allowing developers to fetch sports data with ease. It's been refactored and optimized to provide a straightforward experience. This, in part, uses the Open API v3 [Open API Generator](https://openapi-generator.tech/).

> 🚨 Disclaimer
>
> This package initially provides access to a select set of Rotowire APIsthat have been acquired for my project from Rotowire. Additionally, not all use cases have been exhaustively tested or verified. Users are encouraged to test the package in their specific contexts and report any issues they encounter. Contributions and feedback are always welcome!

## 🌟 Why Use This?

- **Partial Coverage**: This package offers complete access to the a select set of Rotowire Endpoints.
- **Optimized for Use**: The refactoring ensures that accessing and using the API is as intuitive and straightforward as possible.
- **Full documentation**: See [full documentation of the API Specification](https://gfay63.github.io/rotowire-api-client/).

## 🛠 Installation

```sh
npm install rotowire-api-client --save
```

## 🚀 Getting Started

### NestJS Implementation

To begin, you'll need your API keys for MLB, NBA, and NFL.

#### Synchronous Configuration - Using `forRoot`

You can configure the RotowireApiClientModule synchronously using the forRoot method:

```javascript
import { RotowireApiClientModule } from 'rotowire-api-client';

@Module({
  imports: [
    RotowireApiClientModule.forRoot({
      mlb: {
        apiKey: 'YOUR_MLB_API_KEY',
        basePath: 'YOUR_MLB_BASE_PATH',
      },
      nba: {
        apiKey: 'YOUR_NBA_API_KEY',
        basePath: 'YOUR_NBA_BASE_PATH',
      },
      nfl: {
        apiKey: 'YOUR_NFL_API_KEY',
        basePath: 'YOUR_NFL_BASE_PATH',
      },
    }),
  ],
})
export class AppModule {}
```

#### Asynchronous Configuration with ConfigService - Using `forRootAsync`

If you're using NestJS's ConfigModule and ConfigService to manage your application's configuration, you can configure the RotowireApiClientModule asynchronously:

```javascript
import { RotowireApiClientModule } from 'rotowire-api-client';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RotowireApiClientModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        mlb: {
          apiKey: configService.get<string>('MLB_API_KEY'),
          basePath: configService.get<string>('MLB_BASE_PATH'),
        },
        nba: {
          apiKey: configService.get<string>('NBA_API_KEY'),
          basePath: configService.get<string>('NBA_BASE_PATH'),
        },
        nfl: {
          apiKey: configService.get<string>('NFL_API_KEY'),
          basePath: configService.get<string>('NFL_BASE_PATH'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [RotowireApiClientModule], 
})
export class AppModule {}
```

In the asynchronous configuration example, the ConfigService is used to retrieve the API keys and base paths from your environment or configuration files.

#### Using the Client in Your Service or Controller

After configuration, you can import `RotowireApiClientModule` into your module, then import the appropriate API (e.g. `RotowireMlbApi`) and inject the service `RotowireMlbApi.DefaultRotowireMlbApiService` (or the respective service for other sports) into your services or controllers. Here is an example accessing a few of the MLB API endpoints in a controller:

```ts
import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RotowireMlbApi } from 'rotowire-api-client';

@Controller('mlb')
export class MlbController {
    constructor(private readonly rwMlbService: RotowireMlbApi.DefaultRotowireMlbApiService) {}

    @Get('injuries')
    getInjuries(): Observable<any> {
        return this.rwMlbService.injuries("en", "json").pipe(
            map(apiResponse => {
                if (apiResponse.status !== 200) {
                    throw new HttpException(apiResponse.data, apiResponse.status);
                }
                return apiResponse.data;
            }),
            catchError(err => {
                throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
            })
        );
    }
}
```

### Regular Node.js Implementation

For a non-NestJS implementation, you can directly use the services provided by the package.

```javascript
const { DefaultRotowireMlbApiService } = require('rotowire-api-client');

const mlbConfig = {
    apiKey: 'YOUR_MLB_API_KEY',
    basePath: 'https://api.rotowire.us/mlb/production/v7'
};

const mlbService = new DefaultRotowireMlbApiService(mlbConfig);

// Use mlbService to access all the MLB endpoint APIs
```

With these setups, you have the entire Rotowire API at your fingertips! Currently, the package supports MLB, NBA, and NFL. However, other sports can be added in the future.

## 📌 Features

- **Easy Initialization**: Set up and start using the client in no time.
- **Multiple Sports**: Includes endpoints from MLB, NBA and NFL.
- **Expandable**: While the package currently supports MLB, NBA, and NFL, it's designed to be easily expandable to other sports in the future.

## 🤝 Contribute

Your insights and contributions can make this package even better! Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) guide and be a part of this exciting project.

## 📖 Documentation

Our [library's documentation](https://gfay63.github.io/rotowire-api-client/) is generated using TypeDoc, ensuring that you get the most accurate and up-to-date information directly from the source code.

Happy coding! 🎉

### ⚖️ License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
