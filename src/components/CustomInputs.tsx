import styled from "@emotion/styled";
import { OutlinedInput, TextareaAutosize } from "@mui/material";

export const CustomInput = styled((props: any) => (
  <OutlinedInput
    inputProps={{
      "aria-label": "weight",
    }}
    {...props}
  />
))(() => ({
  color: "white",
  height: "50px",
  "& fieldset": {
    borderColor: "white !important",
    borderRadius: "6px",
  },
}));

export const CustomTextArea = styled((props: any) => {
  const { sx, ...rest } = props;
  return <TextareaAutosize
    inputProps={{
      "aria-label": "weight",
    }}
    style={{
      color: "white",
      background: 'transparent',
      fontFamily: 'inherit !important',
      ...(sx || {}),
    }}
    InputProps={{
      sx: {
        
      },
    }}
    {...rest}
  />
})(() => ({
  color: "white",
  height: "50px",
  "& fieldset": {
    borderColor: "white !important",
    borderRadius: "10px",
  },
}));