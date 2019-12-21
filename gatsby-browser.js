import React from "react"
import ReactDOM from "react-dom"
import { ThemeProvider } from "styled-components"
import theme from "./src/templates/theme"
import Splash from "./src/components/elements/splash"

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>{element}</ThemeProvider>
)

export const onClientEntry = () => {
  // ReactDOM.render(<Splash />, document.getElementById("___gatsby"))
}
