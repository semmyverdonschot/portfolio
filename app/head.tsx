export default function Head() {
  return (
    <>
      <title>Semmy Verdonschot | Web Developer</title>
      <meta
        name="description"
        content="Semmy Verdonschot | Web Developer based in The Netherlands."
      />
      <meta name="keywords" content="Web Developer, Portfolio, Next.js, React, JavaScript, Animations, Interactive" />
      <meta name="author" content="Semmy Verdonschot" />
      <meta name="robots" content="index, follow" />

      {/* Theme color for Safari/iOS and Chrome */}
      <meta name="theme-color" content="#171717" />

      {/* Open Graph */}
      <meta property="og:title" content="Semmy Verdonschot | Web Developer" />
      <meta property="og:description" content="Semmy Verdonschot | Web Developer based in The Netherlands." />
      <meta property="og:url" content="https://semmyverdonschot.com" />
      <meta property="og:site_name" content="Semmy Verdonschot Portfolio" />
      <meta property="og:image" content="https://semmyverdonschot.com/webdeveloper.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en-US" />
    </>
  );
}
