import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { WeaponsService } from './weapons.service';
import { CreateWeaponDto } from './dto/create-weapon.dto';
import { UpdateWeaponDto } from './dto/update-weapon.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Weapon } from './entities/weapon.entity';

@ApiTags('weapons')
@Controller('api/v1/weapons')
export class WeaponsController {
  constructor(private readonly weaponsService: WeaponsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Arma criada' })
  @ApiResponse({ status: 409, description: 'Conflito: Arma já existe' })
  create(@Body() dto: CreateWeaponDto) {
    return this.weaponsService.create(dto);
  }

  @Get()
  @ApiQuery({
    name: 'type',
    required: false,
    description: 'Filtra por tipo de arma',
  })
  @ApiQuery({ name: 'q', required: false, description: 'Busca por nome' })
  @ApiResponse({ status: 200, description: 'Lista de armas' })
  findAll(@Query('type') type?: string, @Query('q') q?: string) {
    return this.weaponsService.findAll({
      type: type?.toLowerCase() as Weapon['type'] | undefined,
      q: q?.toLowerCase(),
    });
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Detalhes da arma' })
  findOne(@Param('id') id: string) {
    return this.weaponsService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Arma atualizada' })
  update(@Param('id') id: string, @Body() updateWeaponDto: UpdateWeaponDto) {
    return this.weaponsService.update(id, updateWeaponDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Arma removida com sucesso' })
  remove(@Param('id') id: string) {
    return this.weaponsService.remove(id);
  }
}
