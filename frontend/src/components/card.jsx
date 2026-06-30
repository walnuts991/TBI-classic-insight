function Card({ title, text }) {
  return (
     <div className="bg-sky-500 p-8 rounded-3xl text-white shadow-lg hover:-translate-y-2 transition-all duration-300">
      <h3 className="text-3xl font-bold mb-4">
        {title}
      </h3>

      <p className="text-lg">
        {text}
      </p>
    </div>
  );
}

export default Card;
