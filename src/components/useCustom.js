import { useState, useEffect } from "react"

let listeners = []
let state = {}

const setState = newState => {
  console.log(state)
  state = { ...newState }
  listeners.forEach(listener => {
    listener(state)
  })
}

const useCustom = test => {
  console.log(test)
  const newListener = useState()[1]
  console.log(listeners)
  useEffect(() => {
    listeners.push(newListener)
    console.log(listeners)
  }, [])
  return [state, setState]
}

export default useCustom
