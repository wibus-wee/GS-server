import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiName } from '~/shared/common/decorator/openapi.decorator';
import { PagerDto } from '~/shared/dto/pager.dto';
import { transformDataToPaginate } from '~/shared/transformers/paginate.transformer';
import { CommentsBasicService } from './comments.basic.service';
import { CommentStatus } from './comments.model.basic';

@Controller('comments')
@ApiName
export class CommentsController {
  constructor(private readonly commentsBasicService: CommentsBasicService) {}

  @Get('/')
  // @Auth()
  @ApiOperation({ summary: '获取评论列表' })
  async getRecentlyComments(@Query() query: PagerDto) {
    const { size = 10, page = 1, status = CommentStatus.Approved } = query;
    return transformDataToPaginate(
      await this.commentsBasicService.getAllComments({ size, page, status }),
    );
  }

  @Get('/approved')
  async getApprovedComments() {
    return this.commentsBasicService.getApprovedComments();
  }
}
