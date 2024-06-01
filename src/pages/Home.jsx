import axios from "axios";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { bookFailure, bookStart, bookSuccess } from "../redux/slice/bookSlice";

export default function Home() {
    const [myUrl, setMyUrl] = useState("http://localhost:5100");
    const { books, isLoading } = useSelector(state => state.book);
    const dispatch = useDispatch();

    useEffect(() => {
        const getBooksFunction = async () => {
            try {
                dispatch(bookStart());
                const { data } = await axios.get(`${myUrl}/api/books`);
                dispatch(bookSuccess({ type: "b", data }));
            } catch (error) {
                console.log(error);
                dispatch(bookFailure(error.message));
            }
        };

        getBooksFunction();
    }, []);

    return (
        <div>
            {
                isLoading ? <h1>Loading...</h1> : <>
                    {
                        books.map(book => (
                            <div key={book._id}>
                                <h1>{book.nomi}</h1>
                            </div>
                        ))
                    }
                </>
            }
        </div>
    )
}