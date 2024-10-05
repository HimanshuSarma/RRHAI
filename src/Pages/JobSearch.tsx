import React from 'react';
import { useSelector } from 'react-redux';
import { CurrencyRupee, FmdGood, Description } from '@mui/icons-material';
import { CustomInput } from 'src/components/CustomInputs';
import apiRequest from 'src/api/apiService';
import { IJobListingFromDB } from 'types/types/forms/JobListings';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const JobSearch: React.FC = (): JSX.Element => {

  const navigate = useNavigate();

  // state variables start...
  const [searchTermJobs, setSearchTermJobs] = React.useState<string>("");
  const [allJobListings, setAllJobListings] = React.useState<Array<IJobListingFromDB>>([]);
  const [getJobsResponse, setGetJobsResponse] = React.useState<{
    isFetching: boolean
  }>({
    isFetching: false
  });
  // state variables end...

  const auth = useSelector((store: any) => store.auth);

  // Handlers start...
  const fetchJobs = async () => {

    setGetJobsResponse(getJobsResponse => {
      return {
        ...getJobsResponse,
        isFetching: true
      }
    });

    const { response, error } = await apiRequest({
      url: "jobListings",
      method: "GET",
      params: {
        name: searchTermJobs
      },
      isToken: false
    });

    setGetJobsResponse(getJobsResponse => {
      return {
        ...getJobsResponse,
        isFetching: false
      }
    });
  
    console.log(response, error, "apiRequest")

    if (response) {
      setAllJobListings(response?.data?.payload);
    } else {
      alert(`Failed to fetch job listings. Please refresh the page and try again!`);
    }

  }
  // Handlers end...

  // useEffect start...
  React.useEffect(() => {
    const timerId = setTimeout(() => {
      fetchJobs();
    }, 700);

    return () => {
      clearTimeout(timerId);
    }
  }, [searchTermJobs]);
  // useEffect end...

  console.log(getJobsResponse
    , "allJobListings")

  return (
    <>
      <CustomInput
        fullWidth
        placeholder="Filter jobs"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchTermJobs(e.target.value);
        }}
        value={searchTermJobs}
      />

      <Box
        sx={{
          marginTop: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem"
        }}
      >
        {getJobsResponse?.isFetching ? (
          <CircularProgress size={40} />
        ) : (
          allJobListings?.map((jobListing: IJobListingFromDB) => {
            return (
              <React.Fragment key={jobListing?._id?.toString()}>
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
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "1rem",
                    }}
                  >
                    <Typography>
                      {jobListing?.title}
                    </Typography>
                    {auth?.user?.userRole === "client" ? <Button
                      sx={{
                        borderRadius: "0.75rem"
                      }}
                      onClick={() => {
                        navigate(`/apply/${jobListing?._id}`)
                      }}
                    >
                      Apply
                    </Button> : null}
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
              </React.Fragment>
            )
          })
        )}
      </Box>
    </>
  )
}

export default JobSearch;