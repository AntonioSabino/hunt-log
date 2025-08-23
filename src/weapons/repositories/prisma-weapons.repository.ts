import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Hands, Weapon, WeaponType } from '../entities/weapon.entity';
import { Weapon as PrismaWeapon } from 'generated/prisma';
import {
  CreateWeaponData,
  UpdateWeaponData,
  FindWeaponsParams,
  WeaponsRepository,
} from './weapons.repository';

function mapRowToEntity(row: PrismaWeapon): Weapon {
  return new Weapon(
    row.id,
    row.name,
    row.type as WeaponType,
    row.levelReq,
    row.atk,
    row.atkElemental,
    row.hands as Hands,
    row.imbuementSlots,
  );
}

@Injectable()
export class PrismaWeaponsRepository implements WeaponsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateWeaponData): Promise<Weapon> {
    const weapon = await this.prisma.weapon.create({
      data,
    });

    return mapRowToEntity(weapon);
  }

  async findAll({ type, q }: FindWeaponsParams): Promise<Weapon[]> {
    const weapons = await this.prisma.weapon.findMany({
      where: {
        type: type as WeaponType,
        name: {
          contains: q,
          mode: 'insensitive',
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return weapons.map(mapRowToEntity);
  }

  async findById(id: Weapon['id']): Promise<Weapon | null> {
    const weapon = await this.prisma.weapon.findUnique({
      where: { id },
    });

    return weapon ? mapRowToEntity(weapon) : null;
  }

  async update(
    id: Weapon['id'],
    data: UpdateWeaponData,
  ): Promise<Weapon | null> {
    try {
      const weapon = await this.prisma.weapon.update({
        where: { id },
        data,
      });

      return mapRowToEntity(weapon);
    } catch {
      return null;
    }
  }

  async delete(id: Weapon['id']): Promise<boolean> {
    try {
      await this.prisma.weapon.delete({
        where: { id },
      });
      return true;
    } catch {
      return false;
    }
  }
}
