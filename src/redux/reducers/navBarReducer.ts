import { IAction } from '../type';
import { GET_NAV_ONE } from '../constants';




export default function navBarReducer(state = [], action: IAction) {
    switch (action.type) {
        case GET_NAV_ONE: // 一级分类
            return [action.data];

        default:
            return state;
    }
}