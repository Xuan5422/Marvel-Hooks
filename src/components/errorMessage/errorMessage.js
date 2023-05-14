import imgError from './error.gif';
import './errorMesage.scss';



const ErrorMessage = () => {

    return (
        <div className="error-block">
            <img src={imgError} className="error-class" alt="errorInLoading" />
        </div>



    )
}

export default ErrorMessage;