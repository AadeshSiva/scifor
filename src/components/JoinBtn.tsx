import { useNavigate } from "react-router-dom";

const JoinBtn = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/pricing-plan")}
      className="text-xl bg-foreground border-2 border-[#DBA958] text-[#DBA958] px-24 py-4 mt-14 font-semibold rounded-lg hover:bg-primary transition-colors duration-300"
    >
      JOIN PRSPERA
    </button>
  );
};

export default JoinBtn;
