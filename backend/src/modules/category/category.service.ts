import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private repo: CategoryRepository) {}

  findAll() {
    return this.repo.findAll();
  }
}
