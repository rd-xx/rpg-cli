import { moveCursor, clearLine } from "readline"
import { borderStyles } from "./constants.js"
import { calculateLevel } from "./exp.js"
import chalk from "chalk"

export const printBox = (
  str,
  { width = 50, styleIndex = 0, clear = true, skipLine = true } = {}
) => {
  const style = borderStyles[styleIndex]

  if (!style) {
    return throwThenExit(`Style ${styleIndex} does not exist`)
  }

  const leftPadding = Math.floor((width - str.length - 2) / 2)
  const rightPadding = str.length % 2 ? leftPadding + 1 : leftPadding

  const topBottom = style[0] + style[1].repeat(width - 2) + style[2] + "\n"
  const middle =
    style[3] +
    " ".repeat(leftPadding) +
    str +
    " ".repeat(rightPadding) +
    style[3] +
    "\n"
  const bottom = style[4] + style[1].repeat(width - 2) + style[5]

  if (clear) {
    console.clear()
  }

  console.log(topBottom + middle + bottom)

  if (skipLine) {
    console.log()
  }
}

export const printOptions = (options) => {
  options.forEach(({ title, emoji }, index) => {
    console.log(`${index + 1}. ${title} ${emoji ? emoji : ""}`)
  })
  console.log()
}

export const printStats = (stats) => {
  console.log(chalk.underline("Stats:"))
  console.log(`       → Level: ${chalk.cyan(calculateLevel(stats.exp))}`)
  console.log(
    `       → Health: ${
      stats.health <= 0 ? chalk.red("Dead") : chalk.green(stats.health)
    }`
  )
  console.log(
    `       → Weapon: ${chalk.bold(stats.weapon.name)} (${chalk.red(
      stats.weapon.damage
    )})`
  )
  console.log(`       → Money: ${chalk.yellow("$" + stats.money)}`)
  console.log()
}

export const printError = (errorMessage) => {
  const capitalized =
    errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)

  moveCursor(process.stdout, 0, -2)
  clearLine(process.stdout, 0)
  console.error(chalk.red("=>", capitalized))
}

export const removeError = () => {
  moveCursor(process.stdout, -100, -1)
  clearLine(process.stdout)
  moveCursor(process.stdout, 0, 0)
}

export const gracefulExit = () => {
  printBox("Game over")
  console.log("Thanks for playing!")

  process.exit(0)
}

export const throwThenExit = (errorMessage) => {
  console.error("\n\n" + chalk.red(errorMessage))

  process.exit(1)
}
