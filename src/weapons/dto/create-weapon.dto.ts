import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString, Max, Min } from 'class-validator';
import { Hands, WeaponType } from '../entities/weapon.entity';

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
