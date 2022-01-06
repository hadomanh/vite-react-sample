import PopupSetting from "./components/PopupSetting";
import Todolist from "./components/Todolist";

export const routes = [
    {
        path: '/',
        element: <PopupSetting />
    },
    {
        path: '/popup-setting',
        element: <PopupSetting />
    },
    {
        path: '/todo-list',
        element: <Todolist />
    }
]
