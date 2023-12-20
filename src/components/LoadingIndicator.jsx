import React from "react";
import { Spinner } from "@nextui-org/react";

export default function LoadingIndicator() {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 w-100">
      <Spinner size="lg" />
    </div>
    );
}