import { CrudService } from "@/services/api/crud.service";

export class IngredientsResource extends CrudService {
  constructor() {
    super("http://localhost:3000/ingredients");
  }

  getIngredients() {
    return this.get();
  }
}
