export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="w-12 h-12 border-8 border-(--primary) border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
