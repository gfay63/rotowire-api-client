# 🎉 Rotowire API Client

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

This package provides a seamless integration with the Rotowire API, allowing developers to fetch sports data with ease. It's been refactored and optimized to provide a straightforward experience. It is derived in part from the Rotowire API using Open API v3 [Open API Generator](https://openapi-generator.tech/).

> 🚨 Disclaimer
>
> While this package provides comprehensive access to the Rotowire API, due to the vastness and complexity of the APIs, not all use cases have been exhaustively tested or verified. Users are encouraged to test the package in their specific contexts and report any issues they encounter. Contributions and feedback are always welcome!

## 🌟 Why Use This?

- **Full Coverage**: This package offers complete access to the Rotowire API. No more partial implementations or missing features.
- **Optimized for Use**: The refactoring ensures that accessing and using the API is as intuitive and straightforward as possible.
- **Full documentation**: See [full documentation of the API Specification](https://gfay63.github.io/rotowire-api-client/).

## ✅ Feeds Included (at this point)

- ⚾️ MLB
  - dailyProjections(format, date?)
  - expectedLineups(format, date?)
  - injuries(format)
  - newsInjuries(format, date?)
  - projectedStarters(format, date?, spring_training?)
- 🏀 NBA
  - dailyProjections(format, date?)
  - expectedLineups(format, date?)
  - injuries(format)
  - newsInjuries(format, date?, hours?)
- 🏈 NFL
  - dailyProjections(format, date?)
  - injuries(format)
  - newsInjuries(format, date?, hours?)
  - weeklyProjections(format, position?, season?, team?, week?)

## 🛠 Installation

```sh
npm install rotowire-api-client --save
```

## ⚡ Quick Start

Here's a minimal example to get you started:

```typescript
import { RotowireApiClientModule } from "rotowire-api-client";

@Module({
  imports: [
    RotowireApiClientModule.forRoot({
      apiKey: process.env.ROTOWIRE_API_KEY,
      basePath: process.env.ROTOWIRE_BASE_PATH,
    }),
  ],
})
export class AppModule {}
```

## 🔧 Environment Variables

Create a `.env` file in your project root:

```env
ROTOWIRE_API_KEY=your_rotowire_api_key
ROTOWIRE_BASE_PATH=https://api.rotowire.com/v1
```

## 🚀 Getting Started

### NestJS Implementation

To begin, you'll need your Rotowire API key.

#### Synchronous Configuration - Using `forRoot`

You can configure the RotowireApiClientModule synchronously using the forRoot method:

```typescript
import { RotowireApiClientModule } from "rotowire-api-client";

@Module({
  imports: [
    RotowireApiClientModule.forRoot({
      mlb: {
        apiKey: "YOUR_MLB_API_KEY",
        basePath: "YOUR_MLB_BASE_PATH",
      },
      nba: {
        apiKey: "YOUR_NBA_API_KEY",
        basePath: "YOUR_NBA_BASE_PATH",
      },
      nfl: {
        apiKey: "YOUR_NFL_API_KEY",
        basePath: "YOUR_NFL_BASE_PATH",
      },
    }),
  ],
})
export class AppModule {}
```

#### Asynchronous Configuration with ConfigService - Using `forRootAsync`

If you're using NestJS's ConfigModule and ConfigService to manage your application's configuration, you can configure the RotowireApiClientModule asynchronously:

```typescript
import { RotowireApiClientModule } from "rotowire-api-client";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    RotowireApiClientModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        mlb: {
          apiKey: configService.get<string>("MLB_API_KEY"),
          basePath: configService.get<string>("MLB_BASE_PATH"),
        },
        nba: {
          apiKey: configService.get<string>("NBA_API_KEY"),
          basePath: configService.get<string>("NBA_BASE_PATH"),
        },
        nfl: {
          apiKey: configService.get<string>("NFL_API_KEY"),
          basePath: configService.get<string>("NFL_BASE_PATH"),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [RotowireApiClientModule],
})
export class AppModule {}
```

#### Using the Client in Your Service or Controller

After configuration, you can import `RotowireApiClientModule` into your module, then import the appropriate API and inject the service into your services or controllers. Here is an example accessing some of the Rotowire API endpoints in a controller:

```typescript
import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { RotowireApi } from "rotowire-api-client";

@Controller("rotowire")
export class RotowireController {
  constructor(
    private readonly rotowireService: RotowireApi.DefaultRotowireApiService
  ) {}

  @Get("news")
  getNews(): Observable<any> {
    return this.rotowireService.getNews().pipe(
      map((apiResponse) => {
        if (apiResponse.status !== 200) {
          throw new HttpException(apiResponse.data, apiResponse.status);
        }
        return apiResponse.data;
      }),
      catchError((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      })
    );
  }
}
```

### Regular Node.js Implementation

For a non-NestJS implementation, you can directly use the services provided by the package.

```typescript
import { DefaultRotowireApiService } from "rotowire-api-client";

const config = {
  apiKey: "YOUR_ROTOWIRE_API_KEY",
  basePath: "https://api.rotowire.com/v1",
};

const rotowireService = new DefaultRotowireApiService(config);

// Use rotowireService to access all the Rotowire endpoint APIs
```

## 📌 Features

- **Easy Initialization**: Set up and start using the client in no time.
- **Comprehensive API Access**: Access every aspect of the Rotowire API.
- **Efficient Error Handling**: Built-in logging and error handling mechanisms for smoother development.
- **Regular Updates**: Stay in sync with the official Rotowire API.
- **TypeScript Support**: Full TypeScript support with comprehensive type definitions.

## 🔍 TypeScript Types and Interfaces

The package provides comprehensive TypeScript types and interfaces for all API responses. Here's an example of how to use them:

```typescript
import { RotowireApi, RotowireApiTypes } from "rotowire-api-client";

@Controller("rotowire")
export class RotowireController {
  constructor(
    private readonly rotowireService: RotowireApi.DefaultRotowireApiService
  ) {}

  @Get("news")
  getNews(): Observable<RotowireApiTypes.NewsResponse> {
    return this.rotowireService
      .getNews()
      .pipe(map((apiResponse) => apiResponse.data));
  }
}
```

## ⚠️ Error Handling and Rate Limiting

The package includes built-in error handling and rate limiting support:

```typescript
import { HttpException, HttpStatus } from "@nestjs/common";
import { catchError, retry } from "rxjs/operators";

@Controller("rotowire")
export class RotowireController {
  @Get("data")
  getData() {
    return this.rotowireService.someEndpoint().pipe(
      retry(3), // Retry failed requests up to 3 times
      catchError((err) => {
        if (err.response?.status === 429) {
          throw new HttpException(
            "Rate limit exceeded",
            HttpStatus.TOO_MANY_REQUESTS
          );
        }
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      })
    );
  }
}
```

## 🔧 Troubleshooting

Common issues and their solutions:

1. **API Key Issues**

   - Ensure your API key is correctly set in your environment variables
   - Check if your API key has the necessary permissions
   - Verify the API key is active and not expired

2. **Rate Limiting**

   - Implement retry logic with exponential backoff
   - Cache frequently accessed data
   - Monitor your API usage

3. **Type Errors**
   - Make sure you're using the correct type imports
   - Check the API documentation for the expected response types
   - Use TypeScript's type inference to help catch errors early

## 🤝 Contribute

Your insights and contributions can make this package even better! Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) guide and be a part of this exciting project.

## 📖 Documentation

Our [library's documentation](https://gfay63.github.io/rotowire-api-client/) is generated using TypeDoc, ensuring that you get the most accurate and up-to-date information directly from the source code.

Happy coding! 🎉

### ⚖️ License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
