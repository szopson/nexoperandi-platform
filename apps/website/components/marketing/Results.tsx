export default function Results() {
  return (
    <section id="results" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
          Results
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold text-blue-600 mb-2">90</div>
            <p className="text-gray-600">Day ROI guarantee</p>
          </div>
          <div>
            <div className="text-5xl font-bold text-blue-600 mb-2">50+</div>
            <p className="text-gray-600">Successful projects</p>
          </div>
          <div>
            <div className="text-5xl font-bold text-blue-600 mb-2">100%</div>
            <p className="text-gray-600">End-to-end solutions</p>
          </div>
        </div>
      </div>
    </section>
  );
}
