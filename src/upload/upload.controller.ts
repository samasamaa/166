import {
  Controller,
  Delete,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRole } from 'src/shared/enum/user-role.enum';

@Controller('upload')
@ApiTags('Upload')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @Roles(UserRole.ADMIN) // Sadece admin kullanıcılar için
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadImage(
    @Req() req: Request,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10485760 }), 
          new FileTypeValidator({
            fileType: /image\/(jpg|jpeg|png)$/i, 
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.uploadService.uploadImage(req, file);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN) // Sadece admin kullanıcılar için
  deleteImage(@Param('id') id: number) {
    return this.uploadService.deleteImage(id);
  }
}
