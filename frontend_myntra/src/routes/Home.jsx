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
      const result = await axios.get(
        "http://localhost:3030",
        { withCredentials: true },
        { signal },
      );
      console.log(result);
      dispatch(itemListActions.itemsFromServer({ items: result.data }));
    })();

    return () => {
      console.log("Clean UP!!");
      controller.abort();
    };
  }, []);
  const itemList = useSelector((store) => store.itemList);
  console.log("i am getting ", itemList);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        const result = await axios.get(
          "http://localhost:3030/bag",
          { withCredentials: true },
          { signal },
        );
        console.log(result.data);
        dispatch(
          bagItemsActions.bagLoadedFromServer({ bagItemIds: result.data }),
        );
      } catch (err) {
        if (err.response?.status === 401) {
          dispatch(bagItemsActions.bagLoadedFromServer({ bagItemIds: [] }));
        }
      }
    })();

    return () => {
      console.log("Clean UP!!");
      controller.abort();
    };
  }, []);

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
