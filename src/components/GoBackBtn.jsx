import { useNavigate } from "react-router";

export default function GoBackBtn({ className }) {
  const navigate = useNavigate();

  return (
    <button type="button" onClick={() => navigate(-1)} className={className}>
      ← Back
    </button>
  );
}
