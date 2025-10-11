import Image from "next/image";

import Scrollanimate from "@/hooks/Scrollanimate";

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
      <div className="flex flex-col gap-6">
        <h3 className="text-sm md:text-base text-[var(--color-dark)] uppercase tracking-tight font-bold mb-4 md:mb-6">
          Services
        </h3>
        <Scrollanimate animateOnScroll>
          <p className="text-2xl md:text-4xl lg:text-5xl font-normal text-[var(--color-dark)] leading-tight flex-1 max-w-full md:max-w-4xl mb-8 md:mb-12">
            Constantly learning and growing, I develop full-stack solutions that
            improve with every project—focused on quality, security and
            performance.
          </p>
        </Scrollanimate>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
        <div className="flex flex-col w-full lg:w-1/2 lg:max-w-7xl">
          <div className="h-[340px] md:h-[520px] w-full relative mb-12">
            <Image
              src="/img/ServiceDevelopment.jpg"
              alt="Service Development picture"
              className="object-cover object-center rounded-2xl"
              fill
            />
          </div>
          <div className="flex flex-col gap-8 items-start w-full">
            <div className="w-full max-w-2xl">
              <label
                htmlFor="service-development"
                className="text-4xl md:text-6xl mb-6 font-bold"
              >
                Development
              </label>
              <Scrollanimate animateOnScroll>
                <p className="text-base md:text-lg text-[var(--color-dark)] mt-10 mb-8 max-w-2xl">
                  Building digital products that combine design, technology, and
                  business strategy to deliver seamless user experiences.
                </p>
              </Scrollanimate>
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  "Frontend",
                  "Backend",
                  "Database Management",
                  "Responsive Design",
                  "Secure Authentication",
                  "API",
                ].map((tag) => (
                  <span
                    key={tag}
                    style={{ color: "var(--color-light)" }}
                    className="bg-[var(--color-dark)] text-xs md:text-sm uppercase px-4 py-2 rounded-lg inline-block"
                  >
                    <span className="hidden md:inline">
                      <Scrollanimate animateOnScroll>{tag}</Scrollanimate>
                    </span>
                    <span className="md:hidden">{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-1/2 lg:max-w-7xl">
          <div className="h-[340px] md:h-[520px] w-full relative mb-12">
            <Image
              src="/img/ServiceSEO.png"
              alt="Service SEO picture"
              className="object-cover object-center rounded-2xl"
              fill
            />
          </div>
          <div className="flex flex-col gap-8 items-start w-full">
            <div className="w-full max-w-2xl">
              <label className="text-4xl md:text-6xl font-bold mb-6">
                Optimization
              </label>
              <Scrollanimate animateOnScroll>
                <p className="text-base md:text-lg text-[var(--color-dark)] mt-10 mb-8 max-w-2xl">
                  Enhancing performance and accessibility making sure every
                  product is fast, secure, and ready to grow.
                </p>
              </Scrollanimate>
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  "SEO & online presence",
                  "Performance",
                  "Accessibility",
                  "Progressive Web Apps",
                  "Google Analytics",
                ].map((tag) => (
                  <span
                    key={tag}
                    style={{ color: "var(--color-light)" }}
                    className="bg-[var(--color-dark)] text-xs md:text-sm uppercase px-4 py-2 rounded-lg inline-block"
                  >
                    <span className="hidden md:inline">
                      <Scrollanimate animateOnScroll>{tag}</Scrollanimate>
                    </span>
                    <span className="md:hidden">{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
