import {
  Button,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT_SUCCESS } from "../redux/constants/auth";

const NavBar = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const auth = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "25px 40px",
        zIndex: 9,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}
      >
        {location?.pathname !== "/list-job" ? <NavLink
          to="/list-job"
          style={{
            color: "white",
            background: "transparent",
            borderRadius: "40px",
            padding:"8px 35px",
            border: "2px solid white",
          }}
          onClick={() => navigate("/list-job")}
        >
          POST JOBS
        </NavLink> : null}

        {location?.pathname !== "/" ? <NavLink
          to="/"
          style={{
            color: "white",
            background: "transparent",
            borderRadius: "40px",
            padding:"8px 35px",
            border: "2px solid white",
          }}
          onClick={() => navigate("/")}
        >
          SEARCH JOBS
        </NavLink> : null}
      </Box>
      {auth?.userToken ? (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            {/* <Box */}
            {/*   sx={{ */}
            {/*     margin: "0 24px", */}
            {/*     lineHeight: "0", */}
            {/*   }} */}
            {/* > */}
            {/*   <Link to="/"> */}
            {/*     <img src={NotificationIcon} /> */}
            {/*   </Link> */}
            {/* </Box> */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography>
                  <span style={{ color: "#10EFFA" }}>{auth?.user?.email}</span>
                </Typography>
              </Box>
            </Box>
            <Button
              sx={{
                color: "white",
                background: "transparent",
                borderRadius: "40px",
                padding:"8px 35px",
                border: "2px solid white",
              }}
              onClick={() => {
                dispatch({
                  type: LOGOUT_SUCCESS
                })
              }}
            >
              LOG OUT
            </Button>
            <Typography variant="h1" color="primary"></Typography>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {location?.pathname !== "/login" ? <NavLink
              to="/login"
              style={{
                color: "white",
                background: "transparent",
                borderRadius: "40px",
                padding:"8px 35px",
                border: "2px solid white",
              }}
              onClick={() => navigate("/login")}
            >
              LOG IN
            </NavLink> : null}
            {location?.pathname !== "/signup" ? <NavLink
              to="/signup"
              style={{
                color: "white",
                background: "transparent",
                borderRadius: "40px",
                padding:"8px 35px",
                border: "2px solid white",
              }}
              onClick={() => navigate("/signup")}
            >
              SIGN UP
            </NavLink> : null}
          </Box>
        </>
      )}
    </Box>
  );
};

export default NavBar;
