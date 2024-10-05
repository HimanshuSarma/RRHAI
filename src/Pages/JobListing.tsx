import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { IJobListing } from "types/types/forms/JobListings";
import { Box, Button, CircularProgress, Grid, InputLabel, Typography } from "@mui/material";
import { CustomInput } from "components/CustomInputs";
import FormErrorText from "components/FormErrorText";
import "./JobListing.css";
import apiRequest from "src/api/apiService";
import { useNavigate } from "react-router-dom";

const JobListing: React.FC = (): JSX.Element => {

  // static data start...
  const initialValuesInit = React.useMemo(() => {
    return {
      "title": "",
      "description": "",
      "requirements": [],
      "salary": 20000,
      "location": ""
    }
  }, []);
  // static data end...

  const navigate = useNavigate();

  // const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const isSmallScreen = false;

  // state variables start...
  const [initialValues, setInitialValues] = React.useState<IJobListing>(initialValuesInit);
  const [submitResponse, setSubmitResponse] = React.useState<{
    isSubmitting: boolean
  }>({
    isSubmitting: false
  });
  // state variables end...

  // form schema start...
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    requirements: Yup.array().of(
      Yup.string()
    ).min(1, "Please enter at least 1 requirement!")
    .test(
      "should-be-comma-separated-values",
      "Check the requirements",
      function () {
        const requirementsArr = this.parent.requirements;

        for (let i = 0; i < requirementsArr?.length; i++) {
          if (!requirementsArr?.[i]?.trim()) {
            return false;
          }
        }

        return true;
      }
    ),
    salary: Yup.number(),
    location: Yup.string().required("Location is required"),
  });

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (data) => {

      setSubmitResponse(submitResponse => {
        return {
          ...submitResponse,
          isSubmitting: true
        }
      });

      const payload = {
        ...data
      };

      const res = await apiRequest({
        url: `jobListings`,
        method: "POST",
        data: payload,
        isToken: false,
      });

      setSubmitResponse(submitResponse => {
        return {
          ...submitResponse,
          isSubmitting: false
        }
      })

      console.log(res?.response, res?.error, "apiRequest")

      if (res?.response) {
        formik.resetForm();
        setInitialValues({...initialValuesInit});
        alert(res?.response?.data?.message || `Success!`);
        navigate(`/`);
      } else {
        alert(res?.error?.response?.data.errorMessage || `Success!`);
      }
    }
  });

  const {
    handleChange,
    handleBlur,
    values,
    setValues,
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
          <InputLabel>Title</InputLabel>
          <CustomInput
            fullWidth
            placeholder="Enter the job title"
            name="title"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
          />
          {touched.title && errors.title && (
            <FormErrorText 
              errorMessage={errors.title}
            />
          )}
        </Box>
      </Grid>
      <Grid item xs={isSmallScreen ? 12 : 6}>
        <Box className={"form-box"}>
          <InputLabel>
            Description
          </InputLabel>
          <CustomInput
            fullWidth
            placeholder="Enter the description"
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
          />
          {touched.description && errors.description && (
            <FormErrorText errorMessage={errors.description} />
          )}
        </Box>
      </Grid>
      <Grid item xs={isSmallScreen ? 12 : 6}>
        <Box className={"form-box"}>
          <InputLabel>Requirements</InputLabel>
          <CustomInput
            fullWidth
            placeholder="Enter requirements separated by commas"
            name="requirements"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const requirements = e?.target?.value?.split(",")?.map(item => item?.trim());
              setValues((values) => {
                return {
                  ...values,
                  requirements: e.target.value.length > 0 ? requirements : []
                }
              })
            }}
            onBlur={handleBlur}
            value={values.requirements}
          />
          {touched.requirements && errors.requirements && (
            <FormErrorText errorMessage={Array.isArray(errors.requirements) ? errors.requirements.join(", ") : errors.requirements} />
          )}
        </Box>
      </Grid>
      <Grid item xs={isSmallScreen ? 12 : 6}>
        <Box className={"form-box"}>
          <InputLabel>Salary</InputLabel>
          <CustomInput
            fullWidth
            placeholder="Enter the salary here"
            name="salary"
            type={`number`}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.salary}
          />
          {touched.salary && errors.salary && (
            <FormErrorText errorMessage={errors.salary} />
          )}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box className={"form-box"}>
          <InputLabel>Location</InputLabel>
          <CustomInput
            fullWidth
            placeholder="Location"
            name="location"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.location}
          />
          {touched.location && errors.location && (
            <FormErrorText errorMessage={errors.location} />
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
            }
          }}
          onClick={submitForm}
          // disabled={
          //   contractor?.addContractor?.step1?.submitFormRequestLoading
          // }
          // onClick={onClose}
        >
          {/* {contractor?.addContractor?.step1?.submitFormRequestLoading ? (
            <CircularProgress size={22} />
          ) : ( */}
            <Typography className="btn-text">
              {submitResponse?.isSubmitting ? (
                <CircularProgress size={22} />
              ) : (
                "Submit"
              )}
            </Typography>
          {/* )} */}
        </Button>
      </Box>
    </div>
  )
};

export default JobListing