import { stat, writeFile, readFile } from "fs/promises"
import { throwThenExit } from "./console.js"
import {
  BASE_EXP,
  BASE_HEALTH,
  BASE_MONEY,
  getShop,
  SAVES_FILE,
} from "./constants.js"

const writeSaves = async (saves) => {
  await writeFile(SAVES_FILE, JSON.stringify(saves))
}

export const ensureSetup = async () => {
  try {
    await stat(SAVES_FILE)
  } catch (error) {
    await writeSaves([])
  }
}

export const getSaves = async () => {
  try {
    const saves = await readFile(SAVES_FILE)

    return JSON.parse(saves)
  } catch (error) {
    throwThenExit(
      "Did you delete or edit (and broke) the saves file? That's not cool :("
    )
  }
}

export const getSave = async (saveIndex) => {
  const saves = await getSaves()
  const save = saves[saveIndex]

  if (!save) {
    throwThenExit("Save not found")
  }

  return save
}

export const createNewSave = async () => {
  const saves = await getSaves()
  const newSave = {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    exp: BASE_EXP,
    health: BASE_HEALTH,
    money: BASE_MONEY,
    weapon: getShop[0], // Fists
  }

  saves.push(newSave)
  await writeSaves(saves)

  return newSave
}
