import { Module } from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports:[
        PassportModule,
        JwtModule.register({
            secret:'secret',
            signOptions:{expiresIn:'1d'}
        })
    ],
    providers:[JwtStrategy],
    exports:[JwtModule, PassportModule]
})
export class AuthModule{}