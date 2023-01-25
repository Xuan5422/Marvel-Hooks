import imgError from './error.gif';
import './errorMesage.scss';



const ErroeMessage = () => {

    return (
        <div className="error-block">
            <img src={imgError} className="error-class" alt="errorInLoading" />
        </div>



    )
}

export default ErroeMessage;