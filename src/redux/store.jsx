import { configureStore } from "@reduxjs/toolkit";
import listSlice from "./listSlice/listSlice";
import RequestSlice from "./listSlice/Request";
import isActiveButtonSlice from "./listSlice/isActiveButtonSlice";
import favoriteSlice from "./listSlice/favoriteSlice";
import warningSlice from "./listSlice/warningSlice";
import ModalSlice from "./listSlice/ModalSlice";
import changeNameInModalSlice from "./listSlice/changeNameInModalSlice";
import gridNumberSlice from './listSlice/gridNumberSlice';
import EditElementSlice from './listSlice/EditElementSlice';
import RequestTotalSlice from './listSlice/RequestTotalSlice';
import DisplaySlice from './listSlice/DisplaySlice';

const store = configureStore({
    reducer: {
        list: listSlice, 
        request: RequestSlice,
        isActive: isActiveButtonSlice,
        favorite: favoriteSlice,
        warning: warningSlice,
        modal: ModalSlice,
        name: changeNameInModalSlice,
        number: gridNumberSlice,
        edit: EditElementSlice,
        requestTotal: RequestTotalSlice,
        display: DisplaySlice,
    }
})

export default store;