import Image from "next/image";
import img1 from "@/public/img/sample1.png";
import img2 from "@/public/img/sample1.png";
import Copy from "@/hooks/Scrollanimate";

export default function Services() {
  return (
    <section
      id="services"
      className="pt-48 mb-12 md:mb-48 flex flex-col gap-16 md:gap-24"
      style={{
        background: "transparent",
        color: "var(--color-dark)",
        borderRadius: "16px",
      }}
    >
      <div className="flex flex-col gap-4 md:gap-8">
        <h3 className="text-sm md:text-base text-[var(--color-dark)] uppercase tracking-wider font-bold mb-2 md:mb-3">
          Services
        </h3>
        <Copy animateOnScroll>
          <p className="text-2xl md:text-4xl lg:text-5xl font-normal text-[var(--color-dark)] leading-tight flex-1 max-w-full md:max-w-4xl">
            Constantly learning and growing, I develop full-stack solutions that
            improve with every project—focused on quality, security and
            performance.{" "}
          </p>
        </Copy>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
        <div className="flex flex-col w-full lg:w-1/2 lg:max-w-7xl">
          <div className="h-[250px] md:h-[400px] w-full relative mb-8">
            <Image
              src={img2}
              alt="desktop"
              className="object-cover object-center rounded-[16px]"
              fill
            />
          </div>
          <div className="flex flex-col gap-6 items-start w-full">
            <div className="w-full max-w-2xl">
              <label
                htmlFor="service-development"
                className="text-2xl md:text-6xl mb-4 font-bold"
              >
                Development
              </label>
              <Copy animateOnScroll>
                <p className="text-base md:text-lg text-[var(--color-dark)] mt-8 mb-6 max-w-2xl">
                  Building digital products that combine design, technology, and
                  business strategy to deliver seamless user experiences.
                </p>
              </Copy>
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  "Frontend",
                  "Backend",
                  "Database Management",
                  "Responsive Design",
                  "Secure Authentication",
                  "API",
                ].map((tag, i) => (
                  <Copy key={tag} animateOnScroll delay={i * 0.05}>
                    <span
                      style={{ color: "var(--color-light)" }}
                      className="bg-[var(--color-dark)] text-xs md:text-sm uppercase px-4 py-2 rounded-lg inline-block"
                    >
                      {tag}
                    </span>
                  </Copy>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-1/2 lg:max-w-7xl">
          <div className="h-[250px] md:h-[400px] w-full relative mb-8">
            <Image
              src={img1}
              alt="desktop"
              className="object-cover object-center rounded-[16px]"
              fill
            />
          </div>
          <div className="flex flex-col gap-6 items-start w-full">
            <div className="w-full max-w-2xl">
              <label
                className="text-2xl md:text-6xl font-bold mb-4"
              >
                Optimization
              </label>
              <Copy animateOnScroll>
                <p className="text-base md:text-lg text-[var(--color-dark)] mt-8 mb-6 max-w-2xl">
                  Enhancing performance, accessibility, and user experience
                  through thoughtful improvements—making sure every product is
                  fast, secure, and ready to grow.
                </p>
              </Copy>
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  "SEO & online presence",
                  "Performance",
                  "Accessibility",
                  "Progressive Web Apps",
                  "Google Analytics",
                ].map((tag, i) => (
                  <Copy key={tag} animateOnScroll delay={i * 0.05}>
                    <span
                      style={{ color: "var(--color-light)" }}
                      className="bg-[var(--color-dark)] text-sm md:text-sm uppercase px-4 py-2 rounded-lg inline-block"
                    >
                      {tag}
                    </span>
                  </Copy>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
