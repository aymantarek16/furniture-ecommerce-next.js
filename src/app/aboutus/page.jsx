export const metadata = {
  title: "About Us",
  description:
    "Discover our story, vision, and commitment to crafting timeless furniture pieces with unmatched quality and design.",
};

const Page = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-gray-100">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-6 text-[#a91f64]">
        About Us
      </h1>
      <p className="text-center text-lg text-gray-300 max-w-3xl mx-auto">
        We are more than just a furniture store — we are a team of passionate
        creators dedicated to turning houses into homes through timeless design,
        premium materials, and exceptional craftsmanship.
      </p>

      {/* Our Story */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-4 text-[#a91f64]">
          Our Story
        </h2>
        <p className="leading-relaxed text-gray-300">
          What started as a small workshop with a vision to bring unique,
          handcrafted furniture into everyday living spaces has now grown into a
          trusted name in the furniture industry. For years, we have worked with
          skilled artisans and designers who share our passion for excellence.
          Every piece we create is built to last, designed with both
          functionality and elegance in mind.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="mt-12 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#a91f64]">
            Our Mission
          </h2>
          <p className="leading-relaxed text-gray-300">
            Our mission is simple: to transform your living spaces into places
            of comfort, style, and inspiration. We aim to provide furniture that
            not only looks beautiful but also fits seamlessly into your
            lifestyle.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#a91f64]">
            Our Vision
          </h2>
          <p className="leading-relaxed text-gray-300">
            We envision a future where quality furniture is accessible to
            everyone, where each home is a reflection of personality and taste,
            and where sustainability is at the heart of design.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-[#a91f64]">
          What We Stand For
        </h2>
        <ul className="space-y-3 list-disc list-inside text-gray-300">
          <li>
            <span className="font-semibold">Quality First:</span> Every piece of
            furniture is built with precision and premium materials.
          </li>
          <li>
            <span className="font-semibold">Sustainability:</span> We care for
            the environment by sourcing responsibly and minimizing waste.
          </li>
          <li>
            <span className="font-semibold">Customer Experience:</span> From
            consultation to delivery, we ensure every step is seamless.
          </li>
          <li>
            <span className="font-semibold">Innovation:</span> Blending
            tradition with modern design to create furniture that fits today’s
            lifestyles.
          </li>
        </ul>
      </section>

      {/* Showroom */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-[#a91f64]">
          Our Showroom
        </h2>
        <p className="leading-relaxed text-gray-300">
          Step into our showroom and you’ll find more than just furniture —
          you’ll discover inspiration. From cozy sofas to elegant dining sets
          and timeless bedroom collections, our displays are carefully curated
          to help you imagine how each piece will look in your home.
        </p>
      </section>

      {/* Craftsmanship */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-[#a91f64]">
          Craftsmanship That Lasts
        </h2>
        <p className="leading-relaxed text-gray-300">
          Our artisans combine traditional techniques with modern tools to
          create furniture that is both durable and stylish. Each item is
          inspected with meticulous care, ensuring you receive nothing but the
          best.
        </p>
      </section>

      {/* Call to Action */}
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#a91f64]">
          Experience the Difference
        </h2>
        <p className="text-gray-300 mb-6">
          Visit our showroom or explore our online collection to find furniture
          pieces that bring warmth, character, and elegance into your home.
        </p>
        <a
          href="/products"
          className="inline-block bg-[#a91f64] text-white px-6 py-3 rounded-lg hover:bg-[#8a1b54] transition"
        >
          Explore Our Collection
        </a>
      </section>
    </div>
  );
};

export default Page;
