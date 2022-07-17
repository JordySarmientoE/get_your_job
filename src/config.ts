import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
    return {
        apiKey: process.env.API_KEY,
        port: process.env.PORT,
        jwt_key: process.env.JWT_SECRET,
        database: {
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            name: process.env.DATABASE_NAME
        }
    }
})