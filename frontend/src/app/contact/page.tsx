import ContactForm from '../../components/ContactForm';

export const metadata = {
  title: "Contact Us | ByteToBrain",
  description: "Get in touch with ByteToBrain for your next project.",
};

export default function Contact() {
  return (
    <div className="max-w-lg mx-auto p-8">
      <ContactForm />
    </div>
  );
} 