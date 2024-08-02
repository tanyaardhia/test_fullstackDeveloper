import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function DetailNewsById() {
  const { id } = useParams();
  console.log(id, ">>>>>>> DetailNewsById");
  const [detailNewsById, setDetailNewsById] = useState();

  const fetchDataDetailNewsById = async () => {
    try {
      console.log("masukkkk details");

      const response = await axios.get(`http://localhost:3000/news/${id}`);
      console.log(response.data, "details");

      setDetailNewsById(response.data);
    } catch (error) {
      console.log("error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataDetailNewsById();
  }, [id]);

  return (
    <>
      <div>
        <div className="max-w-screen-lg mx-auto p-5 sm:p-10 md:p-16">
          <div className="mb-10 rounded overflow-hidden flex flex-col mx-auto text-center">
            <p className="max-w-3xl mx-auto text-xl sm:text-4xl font-semibold hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
              {detailNewsById?.title}
            </p>
            <a href="#">
              <img
                className="w-full my-4"
                src={detailNewsById?.imageUrl}
                alt="Photo details"
              />
            </a>
            <p className="text-gray-700 text-base leading-8 max-w-2xl mx-auto">
              {detailNewsById?.description}
            </p>
            <div className="py-5 text-sm font-regular text-gray-900 flex items-center justify-center">
              <p className="flex flex-row items-center mr-3">
                <svg
                  className="text-indigo-600"
                  fill="currentColor"
                  height="16px"
                  aria-hidden="true"
                  role="img"
                  focusable="false"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  ></path>
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
                <span className="ml-1"> {detailNewsById?.writer}</span>
              </p>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
}
