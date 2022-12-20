import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ChangePassForm from "../components/form/ChangePassForm";

function ChangePasswordPage() {
  return (
    <div className="Reg-component-emp">
      <div className="foreground">
        <ChangePassForm />
      </div>
    </div>
  );
}

export default ChangePasswordPage;
