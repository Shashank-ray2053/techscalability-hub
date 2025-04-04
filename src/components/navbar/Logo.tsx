import { useNavigate } from "react-router-dom";
export function Logo() {
  const navigate = useNavigate();
  return <div className="flex items-center h-14 overflow-visible">
      <button onClick={() => {
      navigate("/");
      window.scrollTo(0, 0);
    }} className="flex items-center">
        <img src="/lovable-uploads/8ba19533-60ad-4952-b0e3-9764de070c12.png" alt="TechXplore Logo" className="h-24 w-auto min-w-[200px] max-w-[240px] translate-y-1 object-cover" />
      </button>
    </div>;
}