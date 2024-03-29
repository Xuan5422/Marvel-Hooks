import ErrorMessage from "../errorMessage/errorMessage";
import {Link} from 'react-router-dom';


const Page404 = () => {
    return (
        <div style={{'margin': '0 auto'}}>
           {/*  <ErrorMessage/> */}
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
            <Link style={{'color': 'blue', 'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px'}} to="/">Go to main page</Link>
        </div>
    )
}

export default Page404;