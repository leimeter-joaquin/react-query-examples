import React from "react";
import { AppDispatch, RootState } from "./redux";
import { useDispatch, useSelector } from "react-redux";
import { closeToast } from "./redux/toastSlice";

import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Snackbar, Stack } from "@mui/material";

const AlertMsg = (props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(AlertMsg);

const Toast = () => {
  const dispatch: AppDispatch = useDispatch();

  const toastMessage = useSelector(
    (state: RootState) => state.toast.toastMessage
  );
  const isError = useSelector((state: RootState) => state.toast.isError);

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    dispatch(closeToast());
    if (reason === "clickaway") {
      return;
    }
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={toastMessage !== ""}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          data-testid="snackbar"
          onClose={handleClose}
          severity={isError ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Toast;
