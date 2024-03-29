import { useState, useEffect } from "react"

let listeners = []
let state = {}

const setState = newState => {
  state = { ...newState }
  listeners.forEach(listener => {
    listener(state)
  })
}

const useCustom = test => {
  const newListener = useState()[1]
  useEffect(() => {
    listeners.push(newListener)
  }, [])
  return [state, setState]
}

export default useCustom
