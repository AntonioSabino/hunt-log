import { Module } from '@nestjs/common';
import { WeaponsService } from './weapons.service';
import { WeaponsController } from './weapons.controller';
import { WEAPONS_REPOSITORY } from './repositories/weapons.repository';
import { PrismaWeaponsRepository } from './repositories/prisma-weapons.repository';

@Module({
  controllers: [WeaponsController],
  providers: [
    WeaponsService,
    {
      provide: WEAPONS_REPOSITORY,
      useClass: PrismaWeaponsRepository,
    },
  ],
})
export class WeaponsModule {}
