import Navbar from "../components/navbar";
import { useState } from "react";
import Papa from "papaparse";

const uploadedReviews = [
  {
    id: 1,
    hotel: "Classic Insight",
    rating: 4.8,
    source: "CSV import",
    review: "The staff was attentive, the room was spotless, and check-in was handled very quickly.",
  },
  {
    id: 2,
    hotel: "Classic Insight",
    rating: 3.6,
    source: "Manual entry",
    review: "Breakfast selection was limited during the weekend rush, but the front desk team was helpful.",
  },
  {
    id: 3,
    hotel: "Classic Insight",
    rating: 4.4,
    source: "Pasted reviews",
    review: "Great location and comfortable bedding. The room service response time could be improved.",
  },
];

function Icon({ name, className = "h-5 w-5" }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const icons = {
    upload: (
      <>
        <path d="M12 16V4" />
        <path d="M7 9l5-5 5 5" />
        <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
      </>
    ),
    file: (
      <>
        <path d="M6 3h8l4 4v14H6V3z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6M9 17h6" />
      </>
    ),
    paste: (
      <>
        <path d="M9 4h6l1 2h2v15H6V6h2l1-2z" />
        <path d="M9 4h6" />
        <path d="M9 12h6M9 16h4" />
      </>
    ),
    edit: (
      <>
        <path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3z" />
        <path d="M13.5 7.5l3 3" />
      </>
    ),
    cards: (
      <>
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <path d="M8 9h8M8 13h5" />
      </>
    ),
    spark: (
      <>
        <path d="M12 3l1.7 5.2L19 10l-5.3 1.8L12 17l-1.7-5.2L5 10l5.3-1.8L12 3z" />
        <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...common}>
      {icons[name]}
    </svg>
  );
}

function SectionCard({ icon, title, description, children, className = "" }) {
  return (
    <section className={`rounded-2xl border border-stone-200 bg-white p-6 shadow-[0_18px_45px_rgba(17,24,39,0.07)] ${className}`}>
      <div className="mb-5 flex items-start gap-4">
        <span className="rounded-xl border border-[#C59B63]/30 bg-[#C59B63]/10 p-3 text-[#9A713E]">
          <Icon name={icon} className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-lg font-bold tracking-tight text-[#111827]">{title}</h2>
          <p className="mt-1 text-sm font-medium leading-6 text-[#4B5563]">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function FieldLabel({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#374151]">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function ReviewCard({ review }) {
  return (
    <article className="rounded-xl border border-stone-200 bg-[#FAFAF9] p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-[#111827]">{review.hotel}</h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#6B7280]">{review.source}</p>
        </div>
        <span className="rounded-lg border border-[#C59B63]/30 bg-[#C59B63]/10 px-3 py-1 text-sm font-bold text-[#8A6538]">
          {review.rating} / 5
        </span>
      </div>
      <p className="mt-4 text-sm font-medium leading-6 text-[#374151]">{review.review}</p>
    </article>
  );
}

function Reviews() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
const [pastedReviews, setPastedReviews] = useState("");
const [hotelName, setHotelName] = useState("");
const [rating, setRating] = useState(5);
const [manualReview, setManualReview] = useState("");
const [csvReviews, setCsvReviews] = useState([]);

async function handleAnalyze() {
 if (!pastedReviews.trim() && csvReviews.length === 0) {
  alert("Please paste reviews or upload a CSV.");
  return;
}
 

  setIsAnalyzing(true);

  try {
    let reviews = [];

// Reviews from Paste Reviews
if (pastedReviews.trim()) {
  reviews = pastedReviews
    .split("\n")
    .filter((review) => review.trim() !== "")
    .map((review) => ({
      hotel: "Classic Insight",
      rating: 5,
      review,
    }));
}

// Reviews from CSV
if (csvReviews.length > 0) {
  reviews = [...reviews, ...csvReviews];
}
for (const review of reviews) {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:5000/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      hotel: review.hotel || "Classic Insight",
      rating: Number(review.rating) || 5,
      review: review.review || review,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message);
  }
}

alert("Reviews uploaded successfully!");
    setPastedReviews("");
    setCsvReviews([]);
  } catch (error) {
    console.error(error);
    alert("Failed to upload reviews.");
  }

  setIsAnalyzing(false);
}
async function handleManualSubmit() {
  if (!hotelName || !manualReview) {
    alert("Please fill all fields.");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        hotel: hotelName,
        rating: rating,
        review: manualReview,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to save review");
    }

    alert("Review submitted successfully!");

    // Clear the form
    setHotelName("");
    setRating(5);
    setManualReview("");

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}
function handleCSVUpload(event) {
  const file = event.target.files[0];

  if (!file) return;

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,

    complete: (results) => {
      console.log(results.data);

      setCsvReviews(results.data);

      alert(`${results.data.length} reviews loaded successfully!`);
    },
  });
}


  return (
    <>
    <Navbar/>

    <main className="min-h-screen bg-white pt-24 px-5 pb-8 text-left font-sans text-[#111827] md:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#9A713E]">Review Intake</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#111827] md:text-4xl">
            Import and Manage Guest Reviews
          </h1>
          <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-[#374151]">
            Prepare hotel reviews for AI analysis by uploading CSV files, pasting raw feedback, or adding individual reviews manually.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="space-y-6">
            <SectionCard icon="upload" title="Upload CSV" description="Import a spreadsheet of guest reviews before running analysis.">
              <div className="rounded-2xl border-2 border-dashed border-stone-300 bg-[#FAFAF9] px-6 py-10 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#C59B63]/30 bg-[#C59B63]/10 text-[#9A713E]">
                  <Icon name="file" className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-base font-bold text-[#111827]">Drag and drop your CSV file here</h3>
                <p className="mt-2 text-sm font-medium text-[#4B5563]">Supported format: .csv with hotel, rating, and review columns.</p>
                <label className="mt-6 inline-flex cursor-pointer rounded-lg bg-[#C59B63] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(197,155,99,0.28)] transition-colors hover:bg-[#B88E55]">
                  Choose File
                  <input type="file" accept=".csv" className="sr-only" onChange={handleCSVUpload} />
                </label>
              </div>
            </SectionCard>

            <SectionCard icon="paste" title="Paste Reviews" description="Quickly add batches of unstructured guest feedback.">
              <textarea
                rows="8"
                placeholder="Paste reviews here, one review per line. Example: The room was clean and the staff was helpful."
                className="w-full resize-none rounded-xl border border-stone-300 bg-white p-4 text-sm font-medium leading-6 text-[#111827] outline-none transition-colors placeholder:text-stone-400 focus:border-[#C59B63]"
                value={pastedReviews}
                onChange={(e) => setPastedReviews(e.target.value)}
              />
            </SectionCard>
          </div>

          <div className="space-y-6">
            <SectionCard icon="edit" title="Manual Review Entry" description="Add a single review when managers receive direct feedback.">
              <div className="space-y-5">
                <FieldLabel label="Hotel Name">
                 <input
  type="text"
  placeholder="Classic Insight"
  value={hotelName}
  onChange={(e) => setHotelName(e.target.value)}
  className="h-12 w-full rounded-xl border border-stone-300 bg-white px-4 text-sm font-medium text-[#111827] outline-none transition-colors placeholder:text-stone-400 focus:border-[#C59B63]"
/> 
                </FieldLabel>

                <FieldLabel label="Rating">
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="h-12 w-full rounded-xl border border-stone-300 bg-white px-4 text-sm font-bold text-[#374151] outline-none transition-colors focus:border-[#C59B63]"
                  >
                  <option value={5}>5 - Excellent</option>
<option value={4}>4 - Good</option>
<option value={3}>3 - Average</option>
<option value={2}>2 - Poor</option>
<option value={1}>1 - Critical</option>
                  </select>
                </FieldLabel>

                <FieldLabel label="Review">
                 <textarea
  rows="6"
  value={manualReview}
  onChange={(e) => setManualReview(e.target.value)}
  placeholder="Enter the guest review..."
  className="w-full resize-none rounded-xl border border-stone-300 bg-white p-4 text-sm font-medium leading-6 text-[#111827] outline-none transition-colors placeholder:text-stone-400 focus:border-[#C59B63]"
/>
                </FieldLabel>

                <button
                  type="button"
                  onClick={handleManualSubmit}
                  className="w-full rounded-xl bg-[#111827] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(17,24,39,0.18)] transition-colors hover:bg-[#1F2937]"
                >
                  Submit Review
                </button>
              </div>
            </SectionCard>

            <SectionCard icon="spark" title="Analyze Reviews" description="Run AI analysis after review import is complete.">
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#C59B63] px-6 py-4 text-base font-bold text-white shadow-[0_16px_35px_rgba(197,155,99,0.30)] transition-colors hover:bg-[#B88E55] disabled:cursor-not-allowed disabled:opacity-75"
              >
                {isAnalyzing ? (
                  <>
                    <span className="h-5 w-5 rounded-full border-2 border-white/50 border-t-white animate-spin" />
                    Preparing Analysis
                  </>
                ) : (
                  "Analyze Reviews"
                )}
              </button>
            </SectionCard>
          </div>
        </div>

        <SectionCard icon="cards" title="Uploaded Reviews Preview" description="Review imported entries before sending them to the AI analysis workflow." className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {uploadedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </SectionCard>
      </div>
    </main>
    </>
  );
}

export default Reviews;