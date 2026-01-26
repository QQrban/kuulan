// src/categories/categories.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './categories.model';
import { CategoryAge } from './category-age.model';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private readonly categoryRepo: typeof Category,

    @InjectModel(CategoryAge)
    private readonly categoryAgeRepo: typeof CategoryAge,
  ) {}

  async create(dto: CreateCategoryDto) {
    const name = dto.name.trim().toLowerCase();

    const category = await this.categoryRepo.create({
      name,
      titleKey: `games.categories.${name}.title`,
      descriptionKey: `games.categories.${name}.description`,
    });

    await this.assignAges(category.id, dto.ages);
    return this.findByIdWithAges(category.id);
  }

  async findAll() {
    return this.categoryRepo.findAll({
      include: [{ model: CategoryAge }],
      order: [['name', 'ASC']],
    });
  }

  async findById(id: string) {
    const category = await this.categoryRepo.findByPk(id);
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async findByIdWithAges(id: string) {
    const category = await this.categoryRepo.findByPk(id, {
      include: [{ model: CategoryAge }],
    });

    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async findByName(name: string) {
    return this.categoryRepo.findOne({ where: { name } });
  }

  async updateName(id: string, name: string) {
    const category = await this.findById(id);
    const normalized = name.trim().toLowerCase();

    category.name = normalized;
    category.titleKey = `games.categories.${normalized}.title`;
    category.descriptionKey = `games.categories.${normalized}.description`;

    await category.save();
    return this.findByIdWithAges(id);
  }

  async remove(id: string) {
    await this.categoryAgeRepo.destroy({ where: { categoryId: id } });

    const category = await this.findById(id);
    await category.destroy();

    return { deleted: true };
  }

  async assignAges(categoryId: string, ages: number[]) {
    await this.findById(categoryId);

    await this.categoryAgeRepo.destroy({ where: { categoryId } });

    await this.categoryAgeRepo.bulkCreate(
      ages.map((age) => ({ categoryId, age })),
    );
  }

  async findByAge(age: number) {
    return this.categoryRepo.findAll({
      include: [{ model: CategoryAge, where: { age }, required: true }],
      order: [['name', 'ASC']],
    });
  }
}
