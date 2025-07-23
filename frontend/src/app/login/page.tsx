import LoginForm from '../../components/LoginForm';

export const metadata = {
  title: "Login | ByteToBrain",
  description: "Login to your ByteToBrain account to access exclusive features.",
};

export default function Login() {
  return (
    <div className="max-w-lg mx-auto p-8">
      <LoginForm />
      <div className="mt-4 text-center text-sm text-gray-700">
        New user?{' '}
        <a href="/signup" className="text-blue-600 hover:underline font-semibold">Create an account</a>
      </div>
    </div>
  );
} 