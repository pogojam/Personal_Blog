import React, { useState } from "react"
import { Box } from "rebass"

export const Button = ({ text, onClick, style, ...props }) => {
  return (
    <Box style={{ cursor: "pointer", ...style }} {...props} onClick={onClick}>
      {text}
    </Box>
  )
}
