import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose , {Document} from "mongoose";

export type DocumentEntity = DocumentModel & Document
@Schema({timestamps:true})
export class DocumentModel {
    @Prop({ required :true , maxlength:255})
    title: string;

    @Prop({ required :true})
    content: string;

    @Prop({ type:mongoose.Schema.Types.ObjectId, ref:"User" , required:true})
    ownerId: mongoose.Types.ObjectId;
}
export const DocumentSchema = SchemaFactory.createForClass(DocumentModel)