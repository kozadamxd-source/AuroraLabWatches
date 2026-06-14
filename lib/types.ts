export interface Component {
  name: string;
  image: string;
  price: number;
}

export interface Configuration {
  case: keyof typeof import("../public/pricing.json")["cases"];
  dial: keyof typeof import("../public/pricing.json")["dials"];
  bracelet: keyof typeof import("../public/pricing.json")["bracelets"];
}

export interface CartItem {
  id: string;
  configuration: Configuration;
  quantity: number;
  totalPrice: number;
}
