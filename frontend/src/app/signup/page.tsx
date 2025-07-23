import SignupForm from '../../components/SignupForm';

export const metadata = {
  title: "Sign Up | ByteToBrain",
  description: "Create a new ByteToBrain account to get started with our services.",
};

export default function Signup() {
  return (
    <div className="max-w-lg mx-auto p-8">
      <SignupForm />
      <div className="mt-4 text-center text-sm text-gray-700">
        Already have an account?{' '}
        <a href="/login" className="text-blue-600 hover:underline font-semibold">Login here</a>
      </div>
    </div>
  );
} 