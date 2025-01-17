import { EmailForm } from '../../shared/email/email-form';

const EmailPage: React.FC = () => {
  return (
    <>
      <div className="container grid grid-cols-2 p-8 z-10 absolute">
        <div>
          <EmailForm />
        </div>
        <div>
          <h1>HOLA MUNDO 2</h1>
        </div>
      </div>
    </>
  );
};

export default EmailPage;
