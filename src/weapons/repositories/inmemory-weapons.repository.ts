import { randomUUID } from 'crypto';
import { Weapon } from '../entities/weapon.entity';
import {
  CreateWeaponData,
  FindWeaponsParams,
  UpdateWeaponData,
  WeaponsRepository,
} from './weapons.repository';

export class InMemoryWeaponsRepository implements WeaponsRepository {
  private items: Weapon[] = [];

  create(data: CreateWeaponData): Promise<Weapon> {
    const entity = new Weapon(
      randomUUID(),
      data.name,
      data.type,
      data.levelReq,
      data.atk,
      data.atkElemental,
      data.hands,
      data.imbuementSlots,
    );
    this.items.push(entity);
    return Promise.resolve(entity);
  }

  findAll(params: FindWeaponsParams): Promise<Weapon[]> {
    return Promise.resolve(
      this.items.filter((w) => {
        const byType = params.type ? w.type === (params.type as any) : true;
        const byQ = params.q
          ? w.name.toLowerCase().includes(params.q.toLowerCase())
          : true;
        return byType && byQ;
      }),
    );
  }

  findById(id: string): Promise<Weapon | null> {
    return Promise.resolve(this.items.find((w) => w.id === id) ?? null);
  }

  update(id: string, data: UpdateWeaponData): Promise<Weapon | null> {
    const idx = this.items.findIndex((w) => w.id === id);
    if (idx < 0) return Promise.resolve(null);
    const cur = this.items[idx];
    const next = new Weapon(
      cur.id,
      data.name ?? cur.name,
      data.type ?? cur.type,
      data.levelReq ?? cur.levelReq,
      data.atk ?? cur.atk,
      data.atkElemental ?? cur.atkElemental,
      data.hands ?? cur.hands,
      data.imbuementSlots ?? cur.imbuementSlots,
    );
    this.items[idx] = next;
    return Promise.resolve(next);
  }

  delete(id: string): Promise<boolean> {
    const before = this.items.length;
    this.items = this.items.filter((w) => w.id !== id);
    return Promise.resolve(this.items.length < before);
  }
}
