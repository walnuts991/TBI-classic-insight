import { Button, Input, Modal, Toast, Loader } from "../components/ui";

function ComponentsDemo() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        UI Components Showcase
      </h1>

      <div className="max-w-4xl mx-auto space-y-8">

        <div>
          <h2 className="mb-2">Button Component</h2>
          <Button text="Click Me" />
        </div>

        <div>
          <h2 className="mb-2">Input Component</h2>
          <Input placeholder="Enter your name" />
        </div>

        <div>
          <h2 className="mb-2">Modal Component</h2>
          <Modal title="Demo Modal" />
        </div>

        <div>
          <h2 className="mb-2">Toast Component</h2>
          <Toast message="Success Message" />
        </div>

        <div>
          <h2 className="mb-2">Loader Component</h2>
          <Loader />
        </div>

      </div>
    </div>
  );
}

export default ComponentsDemo;