"use client";
import { useState, useEffect, useRef } from "react";
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
    const remainingTime = useRef(3000);
    const destroy = useRef(false);
    const stopTime = useRef(false);

    function enterMouse() {
      stopTime.current = true;
    }

    function leaveMouse() {
      stopTime.current = false;
    }

    function destroyAlert() {
      destroy.current = true;
    }

    useEffect(() => {
      const interval = setInterval(() => {
        if (remainingTime.current <= 500) {
          setVisible(false);
          if (remainingTime.current <= 0) {
            root.unmount();
            alertContainer?.removeChild(alertNode);
            clearInterval(interval);
          }
        }

        if (destroy.current) {
          remainingTime.current = 500;
        }

        if (!stopTime.current) remainingTime.current -= 10;
      }, 10);

      return () => clearInterval(interval);
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
                zIndex: 9999999,
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
