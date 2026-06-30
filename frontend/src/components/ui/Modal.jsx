/**
 * Modal Component
 * Props:
 * - title
 */

function Modal({ title}) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
  <h2 className="text-2xl font-bold">{title}</h2>
</div>
  );
}

export default Modal;