import React from "react";

const FormErrorText: React.FC<{ errorMessage: string }> = ({
  errorMessage
}): JSX.Element => {
  return (
    <span
      style={{
        color: "#f1300d"
      }}
    >
      {errorMessage}
    </span>
  )
};

export default FormErrorText;