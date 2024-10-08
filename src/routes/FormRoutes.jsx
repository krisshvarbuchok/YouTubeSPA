import SignIn from "../componens/SignIn";
import SignInGoogle from "../componens/SignIn/SignInGoogle/SignInGoogle";
import Succesed from "../componens/Succesed"
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
//import Search from "../componens/SearchBody/Search";

const FormRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/google' element={<SignInGoogle />} />
            <Route element={<PrivateRoute />}>
                <Route path="/authenticated" element={<Succesed />} />
            </Route>
            <Route path='/search' element={<Succesed />} />
            <Route />
        </Routes>
    )
}

export default FormRoutes;