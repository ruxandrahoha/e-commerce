import { useNavigate } from "react-router";

export default function GoBackBtn({ className }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className={`flex items-center gap-2 bg-white backdrop-blur-sm text-(--primary) hover:bg-[var(--primary)] hover:text-white rounded-xl px-3 py-2 cursor-pointer shadow transition ${className}`}
    >
      ← Înapoi
    </button>
  );
}
