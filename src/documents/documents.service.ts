import { Injectable , NotFoundException, ForbiddenException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {Model} from 'mongoose'
import { DocumentModel, DocumentEntity } from "./schemas/document.schema";
import { CreateDocumentDto } from "./dto/create-document.dto";
@Injectable()
export class DocumentsService{
    constructor(@InjectModel(DocumentModel.name) private documentModel: Model<DocumentEntity>){}

    async create(dto:CreateDocumentDto, ownerId):Promise<DocumentEntity>{
        return this.documentModel.create({...dto, ownerId})
    }

    async findAll(user):Promise<DocumentEntity[]>{
        if(user.role ==='Admin') return this.documentModel.find()
        return this.documentModel.find({ownerId:user.userId})
    }
 
    async findOne(id:string,user):Promise<DocumentEntity>{
        const doc = await this.documentModel.findById(id)
        if(!doc) throw new NotFoundException();
        if(doc.ownerId.toString() !== user.userId && user.role !== 'Admin'){
            throw new ForbiddenException()
        }
        return doc;
    }

    async update(id:string , dto:CreateDocumentDto , user){
        const doc = await this.documentModel.findById(id);
        if(!doc) throw new NotFoundException();
        if(doc.ownerId.toString() !== user.userId && user.role !== 'Admin'){
            throw new ForbiddenException()
        }
        return this.documentModel.findByIdAndUpdate(id , dto , { new:true})
    }

    async remove(id : any , user){
        if(user.role !== 'Admin') throw new ForbiddenException();
        return this.documentModel.findOneAndDelete(id)
    }

}