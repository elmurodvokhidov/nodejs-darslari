import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { bookFailure, bookStart, bookSuccess } from "../redux/slice/bookSlice";
import Service from "../config/service";

const BookInfo = () => {
    const { book, isLoading } = useSelector(state => state.book);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const getOneBookFunction = async () => {
            try {
                dispatch(bookStart());
                const { data } = await Service.getOneBook(id);
                dispatch(bookSuccess({ data: data, type: "a" }));
            } catch (error) {
                dispatch(bookFailure());
                console.log(error);
            }
        };

        getOneBookFunction();
    }, []);


    return (
        <div>{isLoading ? "Loading..." : "Vazifa"}</div>
    )
}

export default BookInfo