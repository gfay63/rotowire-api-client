import { Module, DynamicModule, Global } from '@nestjs/common';
import * as RotowireMlbApi from './rotowire_mlb';
import * as RotowireNbaApi from './rotowire_nba';
import * as RotowireNflApi from './rotowire_nfl';
import { Configuration } from './rotowire_mlb';

interface SportConfig {
    basePath: string;
    apiKey: string;
}

interface ModuleConfig {
    mlb: SportConfig;
    nba: SportConfig;
    nfl: SportConfig;
}

@Global()
@Module({})
export class RotowireApiClientModule {
    static forRootAsync(options: {
        imports?: any[];
        useFactory: (...args: any[]) => Promise<ModuleConfig> | ModuleConfig;
        inject?: any[];
    }): DynamicModule {
        return {
            module: RotowireApiClientModule,
            imports: [
                RotowireMlbApi.ApiModule.forRootAsync({
                    imports: options.imports,
                    useFactory: async (...args: any[]) => rotowireApiConfigFactory((await options.useFactory(...args)).mlb),
                    inject: options.inject,
                }),
                RotowireNbaApi.ApiModule.forRootAsync({
                    imports: options.imports,
                    useFactory: async (...args: any[]) => rotowireApiConfigFactory((await options.useFactory(...args)).nba),
                    inject: options.inject,
                }),
                RotowireNflApi.ApiModule.forRootAsync({
                    imports: options.imports,
                    useFactory: async (...args: any[]) => rotowireApiConfigFactory((await options.useFactory(...args)).nfl),
                    inject: options.inject,
                }),
            ],
            exports: [
                RotowireMlbApi.ApiModule,
                RotowireNbaApi.ApiModule,
                RotowireNflApi.ApiModule,
            ],
        };
    }
}

function rotowireApiConfigFactory(config: SportConfig): Configuration {
    return new Configuration({
        basePath: config.basePath,
        apiKeys: { "key": config.apiKey },
    });
}
