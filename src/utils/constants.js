export const SAVES_FILE = "saves.json"

export const borderStyles = [
  ["╭", "─", "╮", "│", "╰", "╯"],
  ["+", "-", "+", "|", "+", "+"],
]

export const BASE_EXP = 50 // Level 1
export const BASE_HEALTH = 150
export const BASE_MONEY = 0

const weapons = [
  {
    name: "Fists",
    damage: 10,
    price: 0,
  },
  {
    name: "Sword",
    damage: 20,
    price: 100,
  },
  {
    name: "Axe",
    damage: 30,
    price: 300,
  },
  {
    name: "Mace",
    damage: 40,
    price: 500,
  },
]

const potions = [
  {
    name: "Health Potion",
    health: 40,
    price: 15,
  },
]

export const getShop = [...weapons, ...potions]

export const monsters = [
  {
    name: "Goblin",
    health: 100,
    damage: 10,
    exp: 50,
    maxLvl: 3,
  },
  {
    name: "Orc",
    health: 200,
    damage: 20,
    exp: 150,
    maxLvl: 7,
  },
  {
    name: "Dragon",
    health: 500,
    damage: 50,
    exp: 500,
    maxLvl: 13,
  },
  {
    name: "Giant",
    health: 1000,
    damage: 100,
    exp: 1000,
    maxLvl: 20,
  },
]
