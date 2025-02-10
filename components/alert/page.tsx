"use client";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import { Alert } from "@mui/material";
import { CheckCircleTwoTone } from "@mui/icons-material";

export function showAlert(message: string, severity: "success" | "error" | "info" | "warning") {
  const alertContainer = document.getElementById("alert-container");

  if (!alertContainer) {
    console.error("Container para alertas não encontrado.");
    return;
  }

  const alertNode = document.createElement("div");
  alertContainer.appendChild(alertNode);

  const root = ReactDOM.createRoot(alertNode);

  function AlertComponent() {
    const [visible, setVisible] = useState(true);
    let remainingTime: number = 3000;
    let stopTime = false;
    let destroy = false;

    function enterMouse() {
      stopTime = true;
    }

    function leaveMouse() {
      stopTime = true;
    }

    function destroyAlert() {
      destroy = true;
    }

    useEffect(() => {
      const interval = setInterval(() => {
        if (remainingTime <= 500) {
          setVisible(false);
          if (remainingTime == 0) {
            root.unmount();
            alertContainer?.removeChild(alertNode);
            clearInterval(interval);
          }
        }

        if (destroy) {
          remainingTime = 500;
          destroy = true;
        }

        if (!stopTime) remainingTime = remainingTime - 10;
      }, 10);
    }, []);

    return (
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, x: 50, y: 150 }}
            animate={{ opacity: 1, x: -10, y: 0 }}
            exit={{ opacity: 0, x: 50, y: -150 }}
            transition={{ duration: 0.5 }}
          >
            <Alert
              onMouseEnter={enterMouse}
              onMouseLeave={leaveMouse}
              onClick={destroyAlert}
              sx={{
                position: "absolute",
                right: "10px",
                bottom: "10vh",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                zIndex: 10,
              }}
              icon={<CheckCircleTwoTone fontSize="inherit" />}
              severity={severity}
            >
              {message}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  root.render(<AlertComponent />);
}
