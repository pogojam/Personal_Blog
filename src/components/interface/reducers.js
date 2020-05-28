import _ from "lodash"

export function PageState(state, action) {
  console.log(state)
  switch (action.type) {
    case "SET_ACTIVE":
      return Object.assign({}, state, { active: action.input })
    case "SET_VIEW":
      return Object.assign({}, state, { view: action.input })
  }
}
