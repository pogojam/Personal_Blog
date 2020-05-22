import _ from "lodash"

export function PageState(state, action) {
  switch (action.type) {
    case "SET_ACTIVE":
      return Object.assign({}, state, { active: action.input })
  }
}
