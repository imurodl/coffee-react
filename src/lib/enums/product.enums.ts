export enum ProductSize {
  SMALL = "300g",
  MEDIUM = "500g",
  LARGE = "800g",
}

export enum ProductVolume {
  HALF = 0.5,
  ONE = 1,
  ONE_POINT_TWO = 1.2,
  ONE_POINT_FIVE = 1.5,
  TWO = 2,
}

export enum ProductStatus {
  PAUSE = "PAUSE",
  PROCESS = "PROCESS",
  DELETE = "DELETE",
}

export enum ProductCollection {
  WHOLE_BEAN = "WHOLE_BEAN",      // for people who grind at home
  GROUND = "GROUND",              // pre-ground coffee
  DECAF = "DECAF",                // decaffeinated, any form
  COLD_BREW = "COLD_BREW",        // bottled or canned cold brew
  INSTANT = "INSTANT",            // soluble coffee
  DRINK = "DRINK",                // ready-to-drink (latte, etc)
  OTHER = "OTHER",                // merch, bundles, etc.
}