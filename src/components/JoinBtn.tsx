import { useNavigate } from "react-router-dom";

const JoinBtn = ({ children, page }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(page)}
      className="text-xl bg-foreground border-2 border-[#DBA958] text-[#DBA958] px-24 py-4 mt-14 font-semibold rounded-lg hover:bg-primary transition-colors duration-300"
    >
      {children}
    </button>
  );
};

export default JoinBtn;
