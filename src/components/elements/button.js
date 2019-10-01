import React, { useState } from "react"
import { Box } from "rebass"

export const Button = ({ text, onClick, ...props }) => {
  return (
    <Box style={{ cursor: "pointer" }} {...props} onClick={onClick}>
      {text}
    </Box>
  )
}
