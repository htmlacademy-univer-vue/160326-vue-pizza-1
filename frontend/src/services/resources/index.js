import { AddressesResource } from "@/services/resources/address.resource";
import { DoughResource } from "@/services/resources/dough.resource";
import { SizeResource } from "@/services/resources/size.resource";
import { IngredientsResource } from "@/services/resources/ingredients.resource";
import { AuthResource } from "@/services/resources/auth.resource";
import { SauceResource } from "@/services/resources/sauce.resource";
import { MiscResource } from "@/services/resources/misc.resource";
import { OrderResource } from "@/services/resources/order.resource";

export default {
  address: new AddressesResource(),
  dough: new DoughResource(),
  size: new SizeResource(),
  sauce: new SauceResource(),
  order: new OrderResource(),
  auth: new AuthResource(),
  misc: new MiscResource(),
  ingredients: new IngredientsResource(),
};
