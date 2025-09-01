import { useNavigate } from "react-router-dom";

const JoinBtn = ({ children, page }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(page);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto", // no smooth scrolling
    }); // scroll to top after navigation
  };

  return (
    <button
      onClick={handleClick}
      className="
        text-base sm:text-lg md:text-xl
        bg-foreground border-2 border-[#DBA958] text-[#DBA958]
        px-6 py-2 sm:px-10 sm:py-3 md:px-16 md:py-4
        mt-6 sm:mt-10 md:mt-14
        font-semibold rounded-lg
        hover:bg-primary transition-colors duration-300
      "
    >
      {children}
    </button>
  );
};

export default JoinBtn;
