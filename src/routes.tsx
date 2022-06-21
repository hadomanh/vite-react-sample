import AppLayout from "@/AppLayout";
import Contract from "@/components/Contract";
import PopupSetting from "@/components/PopupSetting";
import Todolist from "@/components/Todolist";

export const routes = [
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: <Contract />
            },
            {
                path: 'popup-setting',
                element: <PopupSetting />
            },
            {
                path: 'todo-list',
                element: <Todolist />
            }
        ],
    },
    
]
