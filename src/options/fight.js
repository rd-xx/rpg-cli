import { calculateLevel } from "../utils/exp.js"
import { monsters } from "../utils/constants.js"
import { printBox } from "../utils/console.js"
import chalk from "chalk"
import play from "./play.js"

const chooseMonster = async (save) => {
  const currentLevel = calculateLevel(save.exp)
  const options = monsters.filter((monster) => currentLevel <= monster.maxLvl)

  // First option or the last (it means that the player has a level above the maxLvl of the last monster)
  return options[0] ? options[0] : options[options.length - 1]
}

// Monster can have between -10% and +10% of its stats
const tweakMonsterHealth = (monster) => {
  const tweakedMonster = { ...monster }
  const healthModifier = Math.random() * 0.2 - 0.1

  tweakedMonster.health = Math.floor(monster.health * (1 + healthModifier))

  return tweakedMonster
}

// Monster and weapon can have between -20% and +20% of its stats
const tweakDamages = (save, monster) => {
  const saveDamageModifier = Math.random() * 0.4 - 0.2
  const monsterDamageModifier = Math.random() * 0.4 - 0.2

  const weaponDamage = Math.floor(save.weapon.damage * (1 + saveDamageModifier))
  const monsterDamage = Math.floor(monster.damage * (1 + monsterDamageModifier))

  return { weaponDamage, monsterDamage }
}

const fight = async (save) => {
  console.clear()
  printBox("Fighting")

  const chosenMonster = await chooseMonster(save)
  const monster = tweakMonsterHealth(chosenMonster)
  let round = 1
  let defeated = false

  while (!defeated) {
    console.log()
    printBox(`Round ${round++}`, {
      styleIndex: 1,
      clear: false,
      skipLine: false,
    })

    const shouldHitCritical = Math.random() < 0.1 // 10% chance
    const shouldMiss = Math.random() < 0.1 // 10% chance

    const { weaponDamage, monsterDamage } = tweakDamages(save, monster)

    // Critical takes priority over miss
    const damage = shouldHitCritical
      ? weaponDamage * 2
      : shouldMiss
      ? 0
      : weaponDamage

    monster.health -= damage
    save.health -= monsterDamage

    const monsterHpStr = `(Monster HP: ${
      monster.health < 0 ? 0 : monster.health
    })`
    const ownHpStr = `(Your HP: ${save.health < 0 ? 0 : save.health})`

    // Critical
    if (shouldHitCritical) {
      console.log(
        chalk.greenBright.bold("CRITICAL HIT!"),
        damage,
        " HP!",
        monsterHpStr
      )
      console.log("You lost", chalk.red(monsterDamage, "HP!"), ownHpStr)
    }

    // Missed
    if (shouldMiss && damage === 0) {
      console.log(chalk.yellow("You missed!"), monsterHpStr)
      console.log("You lost", chalk.red(monsterDamage, "HP!"), ownHpStr)
    }

    // Normal hit
    if (!shouldHitCritical && !shouldMiss) {
      console.log("You hit", chalk.green(damage, "HP!"), monsterHpStr)
      console.log("You lost", chalk.red(monsterDamage, "HP!"), ownHpStr)
    }

    if (monster.health <= 0) {
      defeated = true
      console.log(chalk.green.bold("You defeated the monster!"))
    }

    if (save.health <= 0) {
      defeated = true
      console.log(chalk.red.bold("You died!"))
    }

    await new Promise((resolve) => setTimeout(resolve, 1000)) // wait 1 second
  }

  // TODO: add money, exp, etc.
  // TODO: update the save

  await new Promise((resolve) => setTimeout(resolve, 5000)) // wait 1 second
  await play(save)
}

export default fight
