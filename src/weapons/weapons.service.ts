import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWeaponDto } from './dto/create-weapon.dto';
import { UpdateWeaponDto } from './dto/update-weapon.dto';
import {
  FindWeaponsParams,
  WEAPONS_REPOSITORY,
  WeaponsRepository,
} from './repositories/weapons.repository';

@Injectable()
export class WeaponsService {
  constructor(
    @Inject(WEAPONS_REPOSITORY)
    private readonly repo: WeaponsRepository,
  ) {}

  async create(dto: CreateWeaponDto) {
    const exists = await this.repo.existsByName(dto.name);
    if (exists) {
      throw new ConflictException('Weapon already exists');
    }

    return this.repo.create(dto);
  }

  findAll(params: FindWeaponsParams) {
    return this.repo.findAll(params);
  }

  async findOne(id: string) {
    const weapon = await this.repo.findById(id);

    if (!weapon) {
      throw new NotFoundException('Weapon not found');
    }

    return weapon;
  }

  async update(id: string, dto: UpdateWeaponDto) {
    const update = await this.repo.update(id, dto);
    if (!update) {
      throw new NotFoundException('Weapon not found');
    }
    return update;
  }

  async remove(id: string) {
    const ok = await this.repo.delete(id);
    if (!ok) {
      throw new NotFoundException('Weapon not found');
    }
    return ok;
  }
}
