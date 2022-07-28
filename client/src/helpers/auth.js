export const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem('recipes-app')
}

export const getPayload = () => {
  const token = getTokenFromLocalStorage()
  if (!token) return
  const payload = token.split('.')[1]
  // console.log(JSON.parse(atob(payload)))
  return JSON.parse(atob(payload))
}

export const userIsAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const currentTime = Math.floor(Date.now() / 1000)
  return currentTime < payload.exp
}

export const userIsOwner = (singleRecipe) => {
  const payload = getPayload()
  if (!payload) return
  return singleRecipe.id === payload.sub
}