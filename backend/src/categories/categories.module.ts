import { forwardRef, Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './categories.model';
import { AuthModule } from '../auth/auth.module';
import { CategoryAge } from './category-age.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Category, CategoryAge]),
    forwardRef(() => AuthModule),
  ],
  providers: [CategoriesService],
  controllers: [CategoriesController],
  exports: [CategoriesService],
})
export class CategoriesModule {}
