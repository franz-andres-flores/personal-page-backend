import { DynamicModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

export const DatabaseMysqlProviderModule: DynamicModule = TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
        console.log();
        
        return {
            type: 'mysql',
            host: config.get<string>('DB_HOST'),
            port: config.get<number>('DB_PORT'),
            username: config.get<string>('DB_USERNAME'),
            password: config.get<string>('DB_PASSWORD'),
            database: config.get<string>('DB_NAME'),
            entities: [],
            autoLoadEntities: true,
            synchronize: config.get<string>('SYNCHRONIZE') === 'TRUE',
            timezone: 'Z',
            extra: {
                supportBigNumbers: true,
                enableKeepAlive: true,
                multipleStatements: false,
                connectionLimit: 50,
            },
            logging: ['error'],
        }
    }
});