export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-neutral-200 border-t-accent-700 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-accent-500 rounded-full animate-spin animation-delay-150"></div>
      </div>
    </div>
  );
}