import { configureStore } from "@reduxjs/toolkit";
import listSlice from "./listSlice/listSlice";
import RequestSlice from "./listSlice/RequestSlice";
import isActiveButtonSlice from "./listSlice/isActiveButtonSlice";
import favoriteSlice from "./listSlice/favoriteSlice";
import ModalSlice from "./listSlice/ModalSlice";
import changeNameInModalSlice from "./listSlice/changeNameInModalSlice";
import gridNumberSlice from './listSlice/gridNumberSlice';
import EditElementSlice from './listSlice/EditElementSlice';
import RequestTotalSlice from './listSlice/RequestTotalSlice';
import DisplaySlice from './listSlice/DisplaySlice';
import SelectSlice from './listSlice/SelectSlice';
import NewNumberSlice from './listSlice/NewNumberSlice';
import WarningMessageSlice from "./listSlice/WarningMessageSlice";

const store = configureStore({
    reducer: {
        list: listSlice, 
        request: RequestSlice,
        isActive: isActiveButtonSlice,
        favorite: favoriteSlice,
        warning: WarningMessageSlice,
        modal: ModalSlice,
        name: changeNameInModalSlice,
        number: gridNumberSlice,
        edit: EditElementSlice,
        requestTotal: RequestTotalSlice,
        display: DisplaySlice,
        select: SelectSlice,
        newNumber: NewNumberSlice,
    }
})

export default store;