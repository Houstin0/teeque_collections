import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/UI/productCard";

function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const API_BASE_URL =
      import.meta.env.VITE_API_BASE_URL ||
      "https://teeque-collections-api.onrender.com/api";

    async function loadCategory() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/products`);
        if (!res.ok) {
          throw new Error("Failed to fetch products.");
        }
        const data = await res.json();
        const normalized = (data || []).map((p) => ({
          ...p,
          id: p.id || p._id || p._id?.toString?.() || p.title,
        }));
        const filtered = normalized.filter((product) =>
          product.category?.includes(category)
        );
        setProducts(filtered);
      } catch (err) {
        setError(err.message || "Unable to load category products.");
      } finally {
        setLoading(false);
      }
    }

    loadCategory();
  }, [category]);

  return (
    <div className="flex flex-col mt-[120px]">
      <nav className="flex ml-4 lg:ml-12 " aria-label="Breadcrumb ">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a
              href="/"
              className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:underline dark:hover:text-blue-400"
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
                {category}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <h2 className="text-3xl font-bold text-center text-black dark:text-white">
        {category}
      </h2>

      {loading && (
        <p className="text-center text-gray-700 dark:text-gray-300 mt-4">
          Loading products...
        </p>
      )}
      {error && !loading && (
        <p className="text-center text-red-600 dark:text-red-400 mt-4">
          {error}
        </p>
      )}
      {!loading && !error && (
        <section
          id="products"
          className="w-full py-2 px-4 lg:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </div>
  );
}

export default CategoryPage;
