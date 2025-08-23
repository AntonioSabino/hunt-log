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

export type WeaponId = string;

export class Weapon {
  constructor(
    public readonly id: WeaponId,
    public name: string,
    public type: WeaponType,
    public levelReq: number,
    public atk: number,
    public atkElemental: number,
    public hands: Hands,
    public imbuementSlots: number,
  ) {}
}
