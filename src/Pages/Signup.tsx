import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Box, Button, CircularProgress, Grid, InputLabel, Typography } from "@mui/material";
import { CustomInput } from "components/CustomInputs";
import FormErrorText from "components/FormErrorText";
import apiRequest from "src/api/apiService";
import { ISignup } from "types/types/forms/Signup";
import "./JobListing.css";

const Signup: React.FC = (): JSX.Element => {

  // static data start...
  const initialValuesInit = React.useMemo<ISignup>(() => {
    return {
      email: "",
      password: ""
    }
  }, []);
  // static data end...

  // react-router hooks start...
  const navigate = useNavigate();
  // react-router hooks end...

  // const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const isSmallScreen = false;

  // state variables start...
  const [initialValues, setInitialValues] = React.useState<ISignup>(initialValuesInit);
  const [submitResponse, setSubmitResponse] = React.useState<{
    isSubmitting: boolean
  }>({
    isSubmitting: false
  });
  // state variables end...

  // form schema start...
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (data) => {
      const payload = {
        ...data
      };

      setSubmitResponse(submitResponse => {
        return {
          ...submitResponse,
          isSubmitting: true
        }
      });

      const res = await apiRequest({
        url: `user/signup`,
        method: "POST",
        data: payload,
        isToken: false,
      });

      setSubmitResponse(submitResponse => {
        return {
          ...submitResponse,
          isSubmitting: false
        }
      });

      console.log(res?.response, res?.error, "apiRequest")

      if (res?.response) {
        formik.resetForm();
        setInitialValues({...initialValuesInit});
        alert(res?.response?.data?.message || `Success!`);
        navigate(`/login`);
      } else {
        alert(res?.error?.response?.data.errorMessage || `Success!`);
      }
    }
  });

  const {
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    submitForm
  } = formik;
  // form schema end...

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem"
      }}
    >
      {/* <Grid container spacing={2}
                    sx={{
                        height: '100%',
                        overflowY: 'auto'
                    }}
                    className={'custom-scroll-design'}
                > */}
      <Grid item xs={isSmallScreen ? 12 : 6}>
        <Box className={"form-box"}>
          <InputLabel>Email</InputLabel>
          <CustomInput
            fullWidth
            placeholder="abc@xyz.com"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {touched.email && errors.email && (
            <FormErrorText 
              errorMessage={errors.email}
            />
          )}
        </Box>
      </Grid>
      <Grid item xs={isSmallScreen ? 12 : 6}>
        <Box className={"form-box"}>
          <InputLabel>
            Password
          </InputLabel>
          <CustomInput
            fullWidth
            placeholder="************"
            name="password"
            type={"password"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {touched.password && errors.password && (
            <FormErrorText errorMessage={errors.password} />
          )}
        </Box>
      </Grid>

      <Box
        className="bottom-btn-box"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "30px",
          marginTop: "30px",
          width: "100%",
          alignSelf: "flex-end",
        }}
      >
        <Button
          sx={{
            minWidth: "0",
            color: "white",
            background: "transparent",
            padding:"0.5rem 1rem",
            border: "2px solid white",
            "&:disabled": {
              background: "transparent !important",
            },
          }}
          onClick={submitForm}
          // disabled={
          //   contractor?.addContractor?.step1?.submitFormRequestLoading
          // }
          // onClick={onClose}
        >
          {submitResponse?.isSubmitting ? (
            <CircularProgress size={22} />
          ) : (
            <Typography className="btn-text">
              {"Signup"}
            </Typography>
          )}
        </Button>
      </Box>
    </div>
  )
};

export default Signup