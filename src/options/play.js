import { printBox, printStats } from "../utils/console.js"
import { askAndExecute } from "../utils/questions.js"
import { gameOptions } from "../index.js"

const play = async (save) => {
  console.clear()
  printBox("Lets play!")
  printStats(save)

  await askAndExecute(undefined, gameOptions, save, true)
}

export default play
