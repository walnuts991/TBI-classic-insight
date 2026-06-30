/**
 * Toast Component
 * Props:
 * - message
 */
function Toast({ message }) {
  return (
    <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
      {message}
    </div>
  );
}

export default Toast;