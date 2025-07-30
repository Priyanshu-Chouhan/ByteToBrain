'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-[#121212] text-white">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
            <button
              onClick={() => reset()}
              className="bg-[#2997FF] text-white px-4 py-2 rounded hover:bg-[#0071E3] transition"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}