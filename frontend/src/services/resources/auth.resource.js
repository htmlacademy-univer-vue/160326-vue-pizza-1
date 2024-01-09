import { AuthService } from "@/services/api/auth.service";

export class AuthResource extends AuthService {
  constructor() {
    super("http://localhost:3000");
  }
}
