/**
 * Button Component
 * Props:
 * - text: button text
 * - onClick: click handler
 */

function Button({ text }) {
  return (
    <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:scale-105 transition">
  {text}
</button>
  );
}

export default Button;