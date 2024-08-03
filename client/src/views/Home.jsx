import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
        
export function Home() {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchDataNews = async (pageNumber) => {
    try {
      const responseNews = await axios.get(`http://localhost:3000/news?page=${pageNumber}`);
      console.log(responseNews, "<< home");
      if (responseNews.data.length > 0) {
        setNews(prevNews => [...prevNews, ...responseNews.data]);
        setHasMore(responseNews.data.length > 0);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchDataNews(page);
  }, [page]);

  const truncateDescription = (description) => {
    if (description.length > 100) {
      return description.substring(0, 120) + "...";
    }
    return description;
  };

  const handleReadDetails = (id) => {
    if (localStorage.getItem("access_token")) {
      navigate(`/news/${id}`);
    } else {
      toast.error("Silahkan login terlebih dahulu");
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

                {/* news */}
                <InfiniteScroll
                  dataLength={news.length}
                  next={() => setPage(prevPage => prevPage + 1)}
                  hasMore={hasMore}
                  loader={<h4>Loading...</h4>}
                  endMessage={<p>Yay! You have seen it all</p>}
                >
                  <div className="flex flex-wrap justify-center gap-4 mt-28">
                    {news.map((item, index) => (
                      <a
                        key={index}
                        className="p-4 sm:p-6 lg:p-8 w-full sm:max-w-sm lg:max-w-md border border-[#9db4d4] rounded-2xl hover:shadow-xl hover:shadow-indigo-50 flex flex-col sm:flex-row lg:flex-col items-center bg-white transition-transform transform duration-300 ease-in-out hover:scale-105"
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
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
