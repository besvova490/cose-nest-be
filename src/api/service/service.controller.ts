import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ServiceService } from './service.service';

// dtos
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceDto } from './dto/service.dto';
import { ServiceAddChampionDto } from './dto/service-add-champion.dto';

// guards
import { AuthGuard } from '../../guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';

// decorators
import { USER_ROLES } from 'src/constants';
import { Roles } from 'src/decorators/role.decorator';
import { IsPublic } from '../../decorators/public.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';

// interceptors
import { Serialize } from '../../interceptors/serialize.interceptor';

@UseGuards(AuthGuard)
@Serialize(ServiceDto)
@Controller()
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Roles(USER_ROLES.ADMIN)
  @UseGuards(RoleGuard)
  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @IsPublic()
  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(+id);
  }

  @Roles(USER_ROLES.SERVICE_CHAMPION)
  @Post('/connect')
  addChampion(@Body() data: ServiceAddChampionDto, @CurrentUser() user) {
    return this.serviceService.addChampion(data.services, user.profile.id);
  }

  // @Roles(USER_ROLES.SERVICE_REQUESTER)
  // @Post(':id/request')
  // requestService(@Param('id') id: string, @CurrentUser() user) {
  //   return this.serviceService.requestService(+id, user.profile.id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(+id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(+id);
  }
}
