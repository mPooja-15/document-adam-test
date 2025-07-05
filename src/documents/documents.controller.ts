import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards/jwt-auth-guard';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { Roles } from 'src/common/decorators/roles.decorator';

interface RequestWithUser extends Request {
  user: {
    userId: string;
    email: string;
    role: string;
  };
}

@Controller('documents')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocumentsController {
  constructor(private readonly documentService: DocumentsService) {}

  @Post()
  create(@Body() dto: CreateDocumentDto, @Req() req: RequestWithUser) {
    return this.documentService.create(dto, req.user.userId);
  }

  @Get()
  findAll(@Req() req: RequestWithUser) {
    return this.documentService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.documentService.findOne(id, req.user);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: CreateDocumentDto,
    @Req() req: RequestWithUser,
  ) {
    return this.documentService.update(id, dto, req.user);
  }

  @Delete(':id')
  @Roles('Admin')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.documentService.remove(id, req.user);
  }
}