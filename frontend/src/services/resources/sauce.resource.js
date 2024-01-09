import { CrudService } from "@/services/api/crud.service";

export class SauceResource extends CrudService {
  constructor() {
    super("http://localhost:3000/sauces");
  }

  getSauce() {
    return this.get();
  }
}
