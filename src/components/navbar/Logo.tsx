
import { useNavigate } from "react-router-dom";

export function Logo() {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center h-14 overflow-visible">
      <button 
        onClick={() => {
          navigate("/");
          window.scrollTo(0, 0);
        }} 
        className="flex items-center"
      >
        <img 
          src="/lovable-uploads/8ba19533-60ad-4952-b0e3-9764de070c12.png" 
          alt="TechXplore Logo" 
          className="h-20 w-auto max-w-[200px] translate-y-1"
        />
      </button>
    </div>
  );
}
