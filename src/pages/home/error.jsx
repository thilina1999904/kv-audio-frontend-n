import { Link } from "react-router-dom";

export default function ErrorNotFound(){
    return(
        <div>
            <h1>404 Error: Page Not Found</h1>
            <Link className="bg-blue-400 p-2" to ="/"> Go To Home Page</Link>
        </div>
    )
}