import SignIn from "../componens/SignIn";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import FavoritesComponent from "../componens/FavoritesComponent/FavoritesComponent";
import MainPage from "../componens/MainPage/MainPage";
import ModalWindow from "../componens/Modal/ModalWindow";


const FormRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/search' element={<MainPage />} />
            <Route path='/favoriteComponent' element={<FavoritesComponent />} />
            <Route path='/modalWindow' element={<ModalWindow />}/>
            <Route element={<PrivateRoute />}>
                <Route path="/authenticated" element={<MainPage />} />
            </Route>


        </Routes>
    )
}

export default FormRoutes;