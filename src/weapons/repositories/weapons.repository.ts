import { Weapon } from '../entities/weapon.entity';

export type FindWeaponsParams = {
  type?: Weapon['type'];
  q?: string;
};

export type CreateWeaponData = Omit<Weapon, 'id'>;
export type UpdateWeaponData = Partial<Omit<Weapon, 'id'>>;

export abstract class WeaponsRepository {
  abstract create(data: CreateWeaponData): Promise<Weapon>;
  abstract findAll(filter: FindWeaponsParams): Promise<Weapon[]>;
  abstract findById(id: Weapon['id']): Promise<Weapon | null>;
  abstract update(
    id: Weapon['id'],
    data: UpdateWeaponData,
  ): Promise<Weapon | null>;
  abstract delete(id: Weapon['id']): Promise<boolean>;
  abstract existsByName(name: string): Promise<boolean>;
}

export const WEAPONS_REPOSITORY = Symbol('WEAPONS_REPOSITORY');
