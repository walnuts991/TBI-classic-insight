/**
 * Input Component
 * Props:
 * - placeholder
 * - value
 * - onChange
 */

function Input({ placeholder }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="border p-2 rounded"
    />
  );
}

export default Input;