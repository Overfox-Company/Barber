import { PRIMARYCOLOR } from "@/constants/Colors";
import { PropsIconType } from "@/types/Components";
import { FC } from "react";


const MetricsIcon: FC<PropsIconType> = ({ size }) => {

    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M17.5 5.83332V14.1667C17.5 16.6667 16.25 18.3333 13.3333 18.3333H6.66667C3.75 18.3333 2.5 16.6667 2.5 14.1667V5.83332C2.5 3.33332 3.75 1.66666 6.66667 1.66666H13.3333C16.25 1.66666 17.5 3.33332 17.5 5.83332Z" fill={PRIMARYCOLOR} />
            <path d="M15.4167 7.70833H13.75C12.4833 7.70833 11.4583 6.68333 11.4583 5.41667V3.75C11.4583 3.40833 11.7417 3.125 12.0833 3.125C12.425 3.125 12.7083 3.40833 12.7083 3.75V5.41667C12.7083 5.99167 13.175 6.45833 13.75 6.45833H15.4167C15.7583 6.45833 16.0417 6.74167 16.0417 7.08333C16.0417 7.425 15.7583 7.70833 15.4167 7.70833Z" fill={PRIMARYCOLOR} />
            <path d="M9.99999 11.4583H6.66666C6.32499 11.4583 6.04166 11.175 6.04166 10.8333C6.04166 10.4917 6.32499 10.2083 6.66666 10.2083H9.99999C10.3417 10.2083 10.625 10.4917 10.625 10.8333C10.625 11.175 10.3417 11.4583 9.99999 11.4583Z" fill={PRIMARYCOLOR} />
            <path d="M13.3333 14.7917H6.66666C6.32499 14.7917 6.04166 14.5083 6.04166 14.1667C6.04166 13.825 6.32499 13.5417 6.66666 13.5417H13.3333C13.675 13.5417 13.9583 13.825 13.9583 14.1667C13.9583 14.5083 13.675 14.7917 13.3333 14.7917Z" fill={PRIMARYCOLOR} />
        </svg>



    )
}
export default MetricsIcon;