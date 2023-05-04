import { ICONS, TASK_STATUS } from "../enums"

export interface LoaderStyle {
    text: string,
    fontColor: string,
    backgroundColor: string
}

export interface GlobalModal {
    iconName: ICONS,
    title: string,
    message: string,
    show: boolean,
    backgroundColor: string
}

export interface UserData {
    id: string,
    email: string,
    urlAvatar: string
}

export interface Task {
    idUser: string,
    date: string,
    title: string,
    status: TASK_STATUS,
    description?: string,
    stepByTask?: Array<string>
}