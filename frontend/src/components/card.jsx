function Card({ name, review, source }) {
  return (
    <div className="app-card rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border hover:-translate-y-1">

      <h3 className="text-2xl font-bold text-[var(--text)]">
        {name}
      </h3>

      <div className="text-[#C59B63] text-2xl mt-3">
        ★★★★★
      </div>

      <p className="app-muted mt-6 leading-8">
        "{review}"
      </p>

      <p className="mt-8 font-semibold text-[#C59B63]">
        {source}
      </p>

    </div>
  );
}

export default Card;
