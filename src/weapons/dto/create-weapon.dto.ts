import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString, Max, Min } from 'class-validator';

export enum WeaponType {
  SWORD = 'sword',
  AXE = 'axe',
  CLUB = 'club',
  FIST = 'fist',
  BOW = 'bow',
  CROSSBOW = 'crossbow',
}

export enum Hands {
  ONE_HANDED = 'one-handed',
  TWO_HANDED = 'two-handed',
}

export class CreateWeaponDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: WeaponType })
  @IsEnum(WeaponType)
  type: WeaponType;

  @ApiProperty({ default: 0 })
  @IsInt()
  @Min(0)
  levelReq: number;

  @ApiProperty({ default: 0 })
  @IsInt()
  @Min(0)
  atk: number;

  @ApiProperty({ default: 0 })
  @IsInt()
  @Min(0)
  atkElemental: number;

  @ApiProperty({ default: 'one-handed' })
  @IsEnum(Hands)
  hands: Hands;

  @ApiProperty({ default: 0 })
  @IsInt()
  @Min(0)
  @Max(3)
  imbuementSlots: number;
}
