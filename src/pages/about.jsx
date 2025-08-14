export default function About() {
  return (
    <section className="bg-gradient-to-r from-blue-300 to-green-400 dark:from-gray-800 dark:to-gray-900 antialiased pb-6 pt-16 mx-4 md:mx-12">
      <div>
        <nav className="flex ml-12" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <a
                href="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <svg
                  className="w-3 h-3 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Home
              </a>
            </li>

            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                  About Us
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl flex items-center justify-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              About
            </span>{" "}
            Us
          </h1>
          <div className="mx-auto max-w-2xl space-y-6">
            <p className="text-base font-normal text-black dark:text-gray-300">
              Welcome to MaliDuka, Your One-Stop Shop for All Your Needs! At MaliDuka, we are dedicated to providing a diverse range of high-quality products to our customers. From electronics and fashion to home goods and more, we strive to offer a seamless shopping experience for everyone.
            </p>
            <h2 className="text-teal-600 dark:text-teal-400">Our Story</h2>

            <p className="text-base font-normal text-black dark:text-gray-300">
              MaliDuka is a small business with a big vision: to make shopping easier and more accessible for everyone. Our commitment to quality and customer satisfaction has helped us grow into a trusted name in online retail.
            </p>

            <p className="text-base font-semibold text-gray-900 dark:text-white">
              Why Shop With Us:
            </p>
            <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-700 dark:text-gray-300">
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {" "}
                  Quality Products:{" "}
                </span>
                We carefully select each product to ensure it meets our high standards for quality and value.
              </li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {" "}
                  Wide Selection:{" "}
                </span>
                With thousands of products across various categories, you're sure to find what you're looking for.
              </li>

              <li>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {" "}
                  Convenient Shopping:{" "}
                </span>
                Enjoy fast and reliable shipping, easy returns, and a user-friendly website for a hassle-free shopping experience.
              </li>
            </ul>
          </div>

          <div className="mx-auto mb-6 max-w-3xl space-y-6 md:mb-12">
            <h2 className="text-teal-600 dark:text-teal-400">Follow Us on Social Media</h2>
            <p className="text-base font-normal text-black dark:text-gray-300">
              Stay connected with us on social media (@MaliDuka) for the latest updates, promotions, and more. Join our community and be part of the conversation!
            </p>
            <h2 className="text-teal-600 dark:text-teal-400">Our Promise</h2>
            <p className="text-base font-normal text-black dark:text-gray-300">
              At MaliDuka, we are committed to providing the best online shopping experience. From the moment you visit our site to the day your order arrives, we are here to make sure you are satisfied with your purchase. Thank you for choosing MaliDuka – Happy Shopping!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
