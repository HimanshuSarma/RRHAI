import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrencyRupee, FmdGood, Description } from '@mui/icons-material';
import * as Yup from "yup";
import { CustomTextArea } from 'src/components/CustomInputs';
import apiRequest from 'src/api/apiService';
import { IJobListingFromDB } from 'types/types/forms/JobListings';
import { Box, Button, CircularProgress, Grid, InputLabel, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { IAppyToJob } from 'types/types/forms/ApplyToJob';
import FormErrorText from 'src/components/FormErrorText';
import "./JobListing.css"

const ApplyToJob: React.FC = (): JSX.Element => {

  // static data start...
  const initialValuesInit = React.useMemo<IAppyToJob>(() => {
    return {
      description: ""
    }
  }, []);
  // static data end...

  const navigate = useNavigate();
  const location = useLocation();

  const jobId = location.pathname?.split("apply/")?.[1];

  // state variables start...
  const [initialValues, setInitialValues] = React.useState<IAppyToJob>(initialValuesInit);
  const [jobListing, setJobListing] = React.useState<IJobListingFromDB>();
  const [getJobResponse, setGetJobResponse] = React.useState<{
    isFetching: boolean
  }>({
    isFetching: false
  });
  const [submitResponse, setSubmitResponse] = React.useState<{
    isSubmitting: boolean
  }>({
    isSubmitting: false
  });
  // state variables end...


  // form schema start...
  const validationSchema = Yup.object().shape({
    description: Yup.string().required("Description is required")
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
        url: `jobListings/apply`,
        method: "POST",
        data: {
          ...payload,
          _id: jobId
        },
        isToken: true,
      });

      setSubmitResponse(submitResponse => {
        return {
          ...submitResponse,
          isSubmitting: false
        }
      });

      if (res?.response) {
        formik.resetForm();
        setInitialValues({...initialValuesInit});
        alert(res?.response?.data?.message || `Success!`);
        navigate(`/`);
      } else {
        alert(res?.error?.response?.data.errorMessage || `Failure!`);
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

  // Handlers start...
  const fetchJob = async () => {

    setGetJobResponse(getJobResponse => {
      return {
        ...getJobResponse,
        isFetching: true
      }
    });

    const { response, error } = await apiRequest({
      url: "jobListings/byId",
      method: "GET",
      params: {
        _id: jobId
      },
      isToken: false
    });

    setGetJobResponse(getJobResponse => {
      return {
        ...getJobResponse,
        isFetching: false
      }
    });
  
    console.log(response, error, "apiRequest")

    if (response) {
      setJobListing(response?.data?.payload);
    } else {
      alert(`Failed to fetch jobListing listings. Please refresh the page and try again!`);
    }

  }
  // Handlers end...

  // useEffect start...
  React.useEffect(() => {
    const timerId = setTimeout(() => {
      fetchJob();
    }, 700);

    return () => {
      clearTimeout(timerId);
    }
  }, []);
  // useEffect end...

  console.log(location
    , "ApplyToJob")

  return (
    <>
      {getJobResponse?.isFetching ? (
        <CircularProgress 
          size={22}
        />
      ) : (
        <>
          <Box
            sx={{
              marginTop: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "2.5rem"
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                padding: "1rem 2rem",
                border: `1px solid white`,
                borderRadius: "1rem"
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem"
                }}
              >
                <Typography>
                  {jobListing?.title}
                </Typography>
              </Box>
              
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem"
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <CurrencyRupee />
                  <Typography>
                    {jobListing?.salary}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <FmdGood />
                  <Typography>
                    {jobListing?.location}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: "1rem"
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <Description />
                  <Typography>
                    {jobListing?.description}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: "1rem"
                }}
              >
                <Typography>
                  {(jobListing?.requirements?.length || 0) ? `Requirements: ` : ""} {jobListing?.requirements?.join(", ")}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              marginTop: "3rem"
            }}
          >
            <Grid item xs={6}>
              <Box className={"form-box"}>
                <InputLabel>Describe why you should be selected for this role.</InputLabel>
                <CustomTextArea
                  sx={{
                    padding: "1rem"
                  }}
                  fullWidth
                  placeholder="description"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  minRows={5}
                />
                {touched.description && errors.description && (
                  <FormErrorText
                    errorMessage={errors.description}
                  />
                )}
              </Box>
            </Grid>
          </Box>

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
                  {"Apply"}
                </Typography>
              )}
            </Button>
          </Box>
        </>
      )}
      
    </>
  )
}

export default ApplyToJob;