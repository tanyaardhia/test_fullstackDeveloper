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
    navigate(`/news/${id}`);
  };

  return (
    <>
      <div>
        <Navbar />
        {/* <ToastContainer /> */}
        <div>
          <div className="bg-white">
            <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
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
                <div>
                  {news.map((item, index) => (
                    <div key={index} className="max-w-2xl mx-auto mt-5">
                      <div className="flex gap-3 bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start">
                        <div className="relative w-32 h-32 flex-shrink-0">
                          <img
                            className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50 bg-slate-600"
                            loading="lazy"
                            src={item.imageUrl}
                            alt="image news"
                          />
                        </div>
                        <div className="flex flex-col gap-2 py-2">
                          <p className="text-xl font-bold text-left">
                            {item.title}
                          </p>
                          <span className="flex items-center justify-start text-gray-500"></span>
                          <p className="text-gray-500 text-left">
                            {truncateDescription(item.description)}{" "}
                            <span>
                              <button
                                onClick={() => handleReadDetails(item.id)}
                                className="text-blue-500 hover:underline mt-2"
                              >
                                Read Details
                              </button>
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
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
