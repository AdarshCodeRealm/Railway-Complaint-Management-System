import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CustomToastContainer() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      style={{
        width: '100%',
        maxWidth: '400px', // Adjust this value as needed
        fontSize: '0.8rem', // Smaller font size for mobile
        padding: '0.5rem', // Smaller padding for mobile
      }}
    />
  );
}