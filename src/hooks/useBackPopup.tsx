import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useBackPopup = () => {
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();

  const handleBackButton = () => setPopup(true);
  const handleSave = () => {
    navigate("/dashboard");
  };
  const handleDontSave = () => navigate("/dashboard");
  const handleCancel = () => setPopup(false);

  return {
    popup,
    handleBackButton,
    handleSave,
    handleDontSave,
    handleCancel,
  };
};
