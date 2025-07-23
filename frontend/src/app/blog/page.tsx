export const metadata = {
  title: "Blog | ByteToBrain",
  description: "Tech articles, life balance topics, and more from ByteToBrain.",
};

export default function Blog() {
  const blogPosts = [];
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center w-full">
        {blogPosts.length === 0 ? (
          <>
            <h1 className="text-4xl font-bold mb-4 text-[#2997FF]">🚧 Under Development</h1>
            <p className="text-lg text-[#C7C7CC] mb-6 text-center max-w-md">
              This page or feature is currently under development.<br />Please check back soon or return to the <a href="/" className="text-[#2997FF] underline">home page</a>.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">Blog</h1>
            <p>Tech articles, life balance topics, and repurposed LinkedIn posts will be shared here.</p>
          </>
        )}
      </main>
    </div>
  );
} 