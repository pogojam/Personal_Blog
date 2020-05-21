import React from "react"

import { withProps } from "../util"
import {
  FiMail,
  FiCalendar,
  FiCreditCard,
  FiChevronRight,
  FiChevronDown,
  FiPhone,
  FiMessageCircle,
  FiClock,
  FiPlus,
  FiLock,
  FiUnlock,
} from "react-icons/fi"
import {
  IoIosCloud,
  IoMdContacts,
  IoMdAmericanFootball,
  IoIosBaseball,
  IoIosBasketball,
  IoMdFootball,
  IoIosTennisball,
  IoMdTrophy,
  IoMdPerson,
  IoIosEasel,
} from "react-icons/io"
import { MdLocationCity, MdLocationOn } from "react-icons/md"
import { MdDragHandle } from "react-icons/md"
import {
  GiVolleyballBall,
  GiBasketballJersey,
  GiSoccerBall,
} from "react-icons/gi"
import {
  DiDocker,
  DiGithubBadge,
  DiJsBadge,
  DiVim,
  DiRust,
  DiReact,
  DiNodejsSmall,
} from "react-icons/di"
import { FaCashRegister, FaSwimmer, FaRegCreditCard } from "react-icons/fa"
import styled from "styled-components"

const DragHandle = styled(MdDragHandle)``

const MessageNotification = ({ messages }) => {
  const Container = styled.div`
    position: relative;
    max-width: 15px;
    .Message_Number {
      color: black;
      position: absolute;
      top: 55%;
      right: -100%;
      transform: translate(-50%, -50%);
      font-size: 0.9em;
      font-family: "Poiret One", cursive;
      font-weight: 900;
      margin: 0;
    }
  `

  return (
    <Container>
      <div className="Message_Number">{messages > 0 ? messages : ""}</div>
      <FiMessageCircle
        fill={messages > 0 ? "red" : "inherit"}
        color={messages > 0 ? "red" : "inherit"}
      />
    </Container>
  )
}

const Shirt = ({ size }) => {
  const Container = styled.div`
    position: relative;
    width: 48px;
    height: 40px;

    .Shirt_Size {
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(20px, 0px);
    }
  `

  return (
    <Container className="Shirt_Icon">
      <p className="Shirt_Size">{size}</p>
    </Container>
  )
}

const Icon = ({ type, ...props }) => {
  switch (type) {
    case "react":
      return withProps(DiReact, props)
    case "rust":
      return withProps(DiRust, props)
    case "vim":
      return withProps(DiVim, props)
    case "node":
      return withProps(DiNodejsSmall, props)
    case "javascript":
      return withProps(DiJsBadge, props)
    case "git":
      return withProps(DiGithubBadge, props)
    case "docker":
      return withProps(DiDocker, props)
    case "soccer":
      return withProps(GiSoccerBall, props)
      break
    case "mail":
      return withProps(FiMail, props)
      break
    case "message":
      return withProps(MessageNotification, props)
      break
    case "card":
      return withProps(FaRegCreditCard, props)
      break
    case "calendar":
      return withProps(FiCalendar, props)
      break
    case "arrow_right":
      return withProps(FiChevronRight, props)
      break
    case "arrow_down":
      return withProps(FiChevronDown, props)
      break
    case "phone":
      return withProps(FiPhone, props)
      break
    case "clock":
      return withProps(FiClock, props)
      break
    case "shirt":
      return withProps(Shirt, props)
      break
    case "plus":
      return withProps(FiPlus, props)
      break
    case "drag":
      return withProps(DragHandle, props)
      break
    case "cloud":
      return withProps(IoIosCloud, props)
    case "register":
      return withProps(FaCashRegister, props)
      break
    case "contact":
      return withProps(IoMdContacts, props)
    case "trophy":
      return withProps(IoMdTrophy, props)
    case "football":
      return withProps(IoMdAmericanFootball, props)
    case "soccer":
      return withProps(IoMdFootball, props)
    case "basketball":
      return withProps(IoIosBasketball, props)
    case "baseball":
      return withProps(IoIosBaseball, props)
    case "swimming":
      return withProps(FaSwimmer, props)
    case "volleyball":
      return withProps(GiVolleyballBall, props)
    case "tennis":
      return withProps(IoIosTennisball, props)
    case "person":
      return withProps(IoMdPerson, props)
    case "jersey":
      return withProps(GiBasketballJersey, props)
    case "city":
      return withProps(MdLocationCity, props)
    case "location":
      return withProps(MdLocationOn, props)
    case "lock":
      return withProps(FiLock, props)
    case "unlock":
      return withProps(FiUnlock, props)
    case "easel":
      return withProps(IoIosEasel, props)

    default:
      return <div></div>
  }
}
export default Icon
