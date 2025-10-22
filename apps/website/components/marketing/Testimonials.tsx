export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
          Proof
        </h2>
        <div className="flex overflow-x-auto snap-x gap-6 md:grid md:grid-cols-2 md:gap-8 pb-4">
          <div className="flex-shrink-0 w-80 md:w-auto snap-center bg-white shadow-sm rounded-lg p-8 border border-gray-100">
            <p className="text-lg mb-4 text-gray-700">
              "60% cost reduction, 40% faster response times."
            </p>
            <p className="font-semibold text-sm">— Sarah Chen, CEO</p>
          </div>
          <div className="flex-shrink-0 w-80 md:w-auto snap-center bg-white shadow-sm rounded-lg p-8 border border-gray-100">
            <p className="text-lg mb-4 text-gray-700">
              "Profitable MVP in 6 weeks."
            </p>
            <p className="font-semibold text-sm">— Marcus Rodriguez, Founder</p>
          </div>
        </div>
      </div>
    </section>
  );
}
