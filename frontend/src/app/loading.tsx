export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2997FF] mx-auto mb-4"></div>
        <p className="text-lg">Loading...</p>
      </div>
    </div>
  );
}