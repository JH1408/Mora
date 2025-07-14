const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className='text-error text-center m-4'>
      {message}
      <br />
      Please try again later.
      <span className='block mt-2'>
        If the problem persists, please contact us.
      </span>
    </div>
  );
};

export default ErrorMessage;
