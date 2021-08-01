function existy(v) {
  return v != null
}

function truthy(v) {
  return existy(v) && v != false
}

export { existy, truthy }
