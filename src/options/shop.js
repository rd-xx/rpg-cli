import { printBox, printStats } from "../utils/console.js"
import { askAndExecute } from "../utils/questions.js"
import { getShop } from "../utils/constants.js"
import { updateSave } from "../utils/saves.js"
import play from "./play.js"
import chalk from "chalk"

const buyItem = async (save, option) => {
  const { object: item } = option

  if (save.money < item.price) {
    printBox("Shop")
    console.log(
      "You",
      chalk.red("don't have"),
      "enough money to purchase the",
      chalk.cyan(item.name) + "."
    )
    console.log("You need", chalk.yellow(`$${item.price - save.money}`) + ".")
    await new Promise((resolve) => setTimeout(resolve, 3000)) // wait 2 seconds

    return await shop(save)
  }

  save.money -= item.price

  if (item.health) {
    save.health += item.health
  } else {
    save.weapon = item
  }

  await updateSave(save)

  printBox("Shop")
  console.log("You bought the", chalk.cyan(item.name) + "!")
  console.log("You now have", chalk.yellow(`$${save.money}`) + ".")

  await new Promise((resolve) => setTimeout(resolve, 4000)) // wait 2 seconds
}

const shop = async (save) => {
  printBox("Shop")
  printStats(save)

  const shopItems = getShop.slice(1)
  const options = shopItems.map((item) => ({
    title:
      chalk.cyan(item.name) +
      " - " +
      chalk.yellow(`$${item.price}`) +
      `\n   → ${
        item.health
          ? `Health: ${chalk.green(item.health)}`
          : `Damage: ${chalk.red(item.damage)}`
      }`,
    object: item,
    fn: buyItem,
  }))

  await askAndExecute(undefined, options, save, { canBack: true })
  await play(save)
}

export default shop
