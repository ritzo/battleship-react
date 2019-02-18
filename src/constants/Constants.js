export const STATES = {
  OPEN: 'open',
  PLAYING: 'playing',
  FINISHED: 'finished',
};

export const SHIPS = [2, 3, 3, 3, 4];

export const ORIENTATION = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
};

export const PLAYERS = {
  PLAYER: 'player',
  OPONENT: 'cpu',
};

export const SQUARE_STATES = {
  EMPTY: 'empty',
  INVALID: 'invalid',
  SHIP: 'ship',
  SHOOT_MISS: 'shoot_miss',
  SHOOT_SHIP: 'shoot_ship',
  SHIP_SUNKEN: 'ship_sunken',
};

export const SQUARE_STATES_ALREADY_SHOT = [
  SQUARE_STATES.SHOOT_MISS,
  SQUARE_STATES.SHOOT_SHIP,
  SQUARE_STATES.SHIP_SUNKEN,
];

export const SQUARE_STATES_FLOATING_SHIP = [
  SQUARE_STATES.SHIP,
  SQUARE_STATES.SHOOT_SHIP,
];

export const SQUARE_STATES_SINKING_SHIP = [
  SQUARE_STATES.SHOOT_SHIP,
  SQUARE_STATES.SHIP_SUNKEN,
  SQUARE_STATES.SHOOT_MISS,
];

export const SQUARE_STATES_OPONENT_VALID_SHOOT = [
  SQUARE_STATES.SHIP,
  SQUARE_STATES.EMPTY,
];

export const BOARD_TYPES = {
  EDITION: 'edition',
  PLAYER: 'player',
  OPONENT: 'oponent',
};
