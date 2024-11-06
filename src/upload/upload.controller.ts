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
    ApiProperty,
    ApiTags,
  } from '@nestjs/swagger';
  import { UploadService } from './upload.service';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { Request } from 'express';
  import { Roles } from './roles.decorator';
  import { RolesGuard } from './roles.guard';
  import { UserRole } from '../enum/user-roles.enum';
  
  @Controller('upload')
  @ApiTags('Upload')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  export class UploadController {
    constructor(private uploadService: UploadService) {}
  
    @Post()
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
    @Roles(UserRole.ADMIN, UserRole.USER) 
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
    @Roles(UserRole.ADMIN) 
    deleteImage(@Param('id') id: number) {
      return this.uploadService.deleteImage(id);
    }
  }
  