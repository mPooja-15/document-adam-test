import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DocumentModel , DocumentSchema } from "./schemas/document.schema";
import { DocumentsController } from "./documents.controller";
import { DocumentsService } from "./documents.service";
// import {DocumentsService} from ""
@Module({
    imports:[
        MongooseModule.forFeature([{name:DocumentModel.name , schema:DocumentSchema}])
    ],
    controllers:[DocumentsController],
    providers:[DocumentsService],
})
export class DocumentsModule{}