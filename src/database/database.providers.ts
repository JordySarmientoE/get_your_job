import { DataSource } from 'typeorm';
import { ICommon } from '../common/common.interfaces';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';

export const databaseProviders = [
    {
        provide: ICommon.DATA_SOURCE,
        inject: [config.KEY],
        useFactory: async (configService: ConfigType<typeof config>) => {
            const dataSource = new DataSource({
                type: ICommon.DATABASE,
                host: configService.database.host,
                port: +configService.database.port,
                username: configService.database.user,
                password: configService.database.password,
                database: configService.database.name,
                entities: [
                    __dirname + '/../**/*.entity.{js,ts}'
                ],
                synchronize: false
            })

            return dataSource.initialize();
        }
    }
]