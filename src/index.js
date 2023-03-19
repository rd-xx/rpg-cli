import { createNewSave, ensureSetup, getSaves } from "./utils/saves.js"
import { askAndExecute } from "./utils/questions.js"
import { calculateLevel } from "./utils/exp.js"
import fight from "./options/fight.js"
import play from "./options/play.js"

const baseOptions = [
  {
    title: "Start a new game",
    emoji: "🏁",
    fn: async () => {
      const save = await createNewSave()
      await play(save)
    },
  },
  {
    title: "Load save",
    emoji: "💾",
    fn: async () => {
      const saves = await getSaves()
      const options = saves.map((save, index) => ({
        title: `Save ${index + 1} (level ${calculateLevel(save.exp)})`,
        fn: async () => await play(save),
      }))

      await askAndExecute("Saves", options)
    },
  },
]

export const gameOptions = [
  {
    title: "Fight",
    emoji: "⚔️",
    fn: fight,
  },
  {
    title: "Shop",
    emoji: "🛒",
    fn: async () => {},
  },
]

await ensureSetup()
await askAndExecute("Welcome!", baseOptions)
