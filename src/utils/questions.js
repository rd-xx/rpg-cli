import { createInterface } from "readline/promises"
import { moveCursor } from "readline"
import {} from "./console.js"
import * as yup from "yup"
import chalk from "chalk"
import {
  printBox,
  printOptions,
  printError,
  removeError,
  gracefulExit,
} from "./console.js"

const rlInterface = createInterface({
  input: process.stdin,
  output: process.stdout,
})

const askOption = async (options) => {
  const question = `Choose an option (${chalk.cyan(`1-${options.length}`)}): `
  const schema = yup
    .number()
    .positive()
    .integer()
    .min(1)
    .max(options.length)
    .required()

  let option
  let shouldRemoveError = false

  while (!option) {
    try {
      const input = await rlInterface.question(question)
      const validatedOption = await schema.validate(input)
      option = validatedOption
    } catch (error) {
      if (shouldRemoveError) {
        removeError()
      }

      /**
       * The following code will print an error message above the question.
       */
      printError(error.message, rlInterface)
      moveCursor(process.stdout, 0)

      shouldRemoveError = true
    }
  }

  return option
}

export const askAndExecute = async (title, options, save, shouldLoop) => {
  if (title) {
    printBox(title)
  }

  // We have to create a copy of the array so we don't mutate the original
  options = [...options]

  // Inject the exit option
  options.push({
    title: "Exit",
    emoji: "❌",
    fn: gracefulExit,
  })

  printOptions(options)
  const optionNumber = await askOption(options)
  const option = options[optionNumber - 1]

  if (shouldLoop) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      await option.fn(save)
    }
  } else {
    await option.fn(save)
  }
}
