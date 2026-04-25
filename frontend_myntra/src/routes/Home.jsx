import { useDispatch, useSelector } from "react-redux";
import HomeItem from "../components/HomeItem";
import { useEffect } from "react";
import axios from "axios";
import { itemListActions } from "../store";
const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        const result = await axios.get(`${import.meta.env.VITE_COMMON_URL}`, {
          withCredentials: true,
          signal,
        });
        console.log(result);
        dispatch(itemListActions.itemsFromServer({ items: result.data }));
      } catch (err) {
        if (axios.isCancel(err) || err?.code === "ERR_CANCELED") return;
        console.log("home fetch error", err);
      }
    })();

    return () => {
      console.log("Clean UP!!");
      controller.abort();
    };
  }, []);
  const itemList = useSelector((store) => store.itemList);
  console.log("i am getting ", itemList);

  return (
    <>
      <main>
        <div className="items-container">
          {itemList.map((item) => {
            return <HomeItem key={item._id} item={item}></HomeItem>;
          })}
        </div>
      </main>
    </>
  );
};
export default Home;
