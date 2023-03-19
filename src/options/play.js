import { printBox, printStats } from "../utils/console.js"
import { askAndExecute } from "../utils/questions.js"
import { BASE_HEALTH } from "../utils/constants.js"
import { updateSave } from "../utils/saves.js"
import { gameOptions } from "../index.js"
import chalk from "chalk"

const play = async (save) => {
  printBox("Lets play!")
  printStats(save)

  const currentHealth = save.health

  if (currentHealth <= 0) {
    console.log(chalk.red("You are dead, you can't play."))
    console.log(
      "But I'm feeling",
      chalk.underline("generous"),
      " today so I'll give you another chance."
    )
    console.log(
      "However, that comes with a price. I'll take",
      chalk.red.bold("all"),
      "your money. :)"
    )

    save.health = BASE_HEALTH
    save.money = 0

    await updateSave(save)
    await new Promise((resolve) => setTimeout(resolve, 5000)) // wait 5 second

    return await play(save)
  }

  await askAndExecute(undefined, gameOptions, save, { shouldLoop: true })
}

export default play
