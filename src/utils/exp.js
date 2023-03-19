export const calculateLevel = (exp) => Math.floor(Math.sqrt(exp / 50))

export const calculateExpGained = (monster) => {
  const exp = monster.exp
  // 20% chance to get 10% more exp
  const expModifier = Math.random() < 0.2 ? 1.1 : 1
  const expGained = Math.floor(exp * expModifier)

  return expGained
}

export const calculateMoneyGained = (monster) =>
  Math.floor(monster.exp / monster.maxLvl)
