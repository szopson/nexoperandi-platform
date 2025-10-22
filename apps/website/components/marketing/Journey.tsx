export default function Journey() {
  return (
    <section id="journey" className="py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          <div className="text-center md:text-left">
            <div className="text-8xl font-bold text-gray-200 mb-4">01</div>
            <h3 className="text-2xl font-bold mb-3">MVP</h3>
            <p className="text-gray-600 leading-relaxed">
              Build working products in weeks.
              <br />
              Test. Refine. Launch.
            </p>
          </div>
          <div className="text-center md:text-left">
            <div className="text-8xl font-bold text-gray-200 mb-4">02</div>
            <h3 className="text-2xl font-bold mb-3">Content</h3>
            <p className="text-gray-600 leading-relaxed">
              Content that converts.
              <br />
              Blogs. Videos. Social.
            </p>
          </div>
          <div className="text-center md:text-left">
            <div className="text-8xl font-bold text-gray-200 mb-4">03</div>
            <h3 className="text-2xl font-bold mb-3">Optimization</h3>
            <p className="text-gray-600 leading-relaxed">
              Automate customer support.
              <br />
              Cut costs 60%. Boost revenue 3x.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
