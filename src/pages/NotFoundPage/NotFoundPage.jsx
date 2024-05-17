import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div>
            <p>Not found</p>
            <Link to="/">Home page</Link>
        </div>
    )
}

export default NotFoundPage;