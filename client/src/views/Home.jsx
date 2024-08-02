import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [news, setNews] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const fetchDataNews = async () => {
    try {
      const responseNews = await axios.get("http://localhost:3000/news");
      console.log(responseNews, "<< home");
      setNews(responseNews.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchDataNews();
  }, []);

  const truncateDescription = (description) => {
    if (description.length > 100) {
      return description.substring(0, 120) + "...";
    }
    return description;
  };

  const handleReadDetails = (id) => {
    if (!isLoggedIn) {
      toast.error("please log in to view the news details");
      setTimeout(() => {
        navigate(`/news/${id}`);
      }, 5000);
    }
  };

  return (
    <>
      <div>
        <Navbar />
        <ToastContainer />
        <div>
          <div className="bg-white">
            <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
              <div className="mx-auto text-center">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                  Dapatkan Informasi Terbaru Secara Real-Time
                  <br />
                  Berita Cepat, Akurat, dan Terpercaya
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-gray-600">
                  Portal berita terdepan yang menyediakan informasi terkini,
                  terpercaya, dan mendalam tentang berbagai peristiwa global dan
                  lokal. Dengan komitmen untuk menyajikan berita secara cepat
                  dan akurat, PrimeHeadlines memastikan bahwa pembaca
                  mendapatkan kabar terbaru langsung dari sumbernya.
                </p>

                {/* search */}
                <div className="my-10 flex items-center justify-center gap-x-6">
                  <form className="mx-auto max-w-xl py-2 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300">
                    <input
                      type="text"
                      placeholder="Search anything"
                      className="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0 text-sm"
                      name="topic"
                    />
                    <button className="flex flex-row items-center justify-center min-w-[130px] px-4 rounded-full font-medium tracking-wide border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-sm bg-[#AF8F6F] text-white border-transparent py-1.5 h-[38px] -mr-3">
                      Search
                    </button>
                  </form>
                </div>

                {/* news */}
                <div className="flex flex-wrap justify-center gap-4">
                  {news.map((item, index) => (
                    <a
                      key={index}
                      className="p-4 sm:p-6 lg:p-8 w-full sm:max-w-sm lg:max-w-md border border-indigo-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-50 flex flex-col sm:flex-row lg:flex-col items-center s bg-white transition duration-300 ease-in-out"
                      href="#"
                    >
                      <img
                        src={item.imageUrl}
                        alt="image news"
                        className="shadow rounded-lg overflow-hidden border object-cover object-center w-full sm:w-1/3 lg:w-full h-40 sm:h-32 lg:h-56"
                      />
                      <div className="mt-4 sm:mt-0 lg:mt-8 sm:ml-4 lg:ml-0 text-center sm:text-left lg:text-center w-full">
                        <h4 className="font-bold text-lg sm:text-lg lg:text-xl text-left">
                          {item.title}
                        </h4>
                        <p className="mt-2 text-gray-600 text-xs sm:text-sm lg:text-base text-left">
                          {truncateDescription(item.description)}{" "}
                          <span
                            className="hover:text-[#254336] hover:font-bold"
                            onClick={() => handleReadDetails(item.id)}
                          >
                            read detail
                          </span>
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
