const randomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const calculateLevel = (exp) => Math.floor(Math.sqrt(exp / 50))

export const calculateExpGained = (playerLevel, enemyLevel) => {
  const baseExp = randomNumberBetween(10, 20)

  return enemyLevel * (baseExp + playerLevel)
}
