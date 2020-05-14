import React, { useState } from "react"
import { Box } from "rebass"

export const Button = ({ text, onClick, style, children, ...props }) => {
  return (
    <Box style={{ cursor: "pointer", ...style }} {...props} onClick={onClick}>
      {text}
      {children && children}
    </Box>
  )
}
