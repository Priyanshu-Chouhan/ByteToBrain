export const metadata = {
  title: "Testimonials | ByteToBrain",
  description: "Feedback from our clients, students, and partners.",
};

export default function Testimonials() {
  const testimonials = [];
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center w-full">
        {testimonials.length === 0 ? (
          <>
            <h1 className="text-4xl font-bold mb-4 text-[#2997FF]">🚧 Under Development</h1>
            <p className="text-lg text-[#C7C7CC] mb-6 text-center max-w-md">
              This page or feature is currently under development.<br />Please check back soon or return to the <a href="/" className="text-[#2997FF] underline">home page</a>.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">Testimonials</h1>
            <p>Feedback from students, clients, and mentors will be displayed here.</p>
          </>
        )}
      </main>
    </div>
  );
} 