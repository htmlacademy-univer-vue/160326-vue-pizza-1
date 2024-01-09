import { CrudService } from "@/services/api/crud.service";

export class MiscResource extends CrudService {
  constructor() {
    super("http://localhost:3000/misc");
  }

  getMisc() {
    return this.get();
  }
}
