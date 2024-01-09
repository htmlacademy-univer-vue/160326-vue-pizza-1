import { CrudService } from "@/services/api/crud.service";

export class DoughResource extends CrudService {
  constructor() {
    super("http://localhost:3000/dough");
  }

  getDough() {
    return this.get();
  }
}
