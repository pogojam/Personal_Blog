import styled from "styled-components"
import { changeTo, withProps } from "../util"

const Heading = ({ type, ...props }) => {
  switch (type) {
    case "Small":
      return withProps(changeTo(Small, "h3"), props)
    case "Sub":
      return withProps(changeTo(Sub, "h2"), props)
      break
    case "Big":
      return withProps(changeTo(Big, "h1"), props)
      break
    default:
      return withProps(Standard, props)
  }
}

const Base = styled.h1``

const Sub = styled(Base)`
letter-spacing: 4px;
    font-size: 1em;
}

`

const Small = styled(Base)``
const Big = styled(Base)``

const Standard = styled(Base)``

export default Heading
