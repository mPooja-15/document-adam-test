import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument =User & Document

@Schema()
export class User {
    @Prop({ required :true})
    fullName: string;

    @Prop({ required :true ,unique:true})
    email: string;

    @Prop({ required :true})
    password: string;

    @Prop({enum:['Regular' , 'Admin'],default:'Regular'})
    role: string;

}

export const UserSchema= SchemaFactory.createForClass(User)