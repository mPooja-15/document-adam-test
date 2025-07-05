import { IsNotEmpty ,IsString , MaxLength} from "class-validator"

export class CreateDocumentDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    title:string;

    @IsNotEmpty()
    @IsString()
    content:string

}