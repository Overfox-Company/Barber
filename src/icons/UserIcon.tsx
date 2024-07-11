import { PRIMARYCOLOR } from "@/constants/Colors";
import { PropsIconType } from "@/types/Components";
import { FC } from "react";


const UserIcon: FC<PropsIconType> = ({ size }) => {

    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M10 9.99999C12.3012 9.99999 14.1667 8.13451 14.1667 5.83332C14.1667 3.53214 12.3012 1.66666 10 1.66666C7.69882 1.66666 5.83334 3.53214 5.83334 5.83332C5.83334 8.13451 7.69882 9.99999 10 9.99999Z" fill={PRIMARYCOLOR} />
            <path d="M9.99998 12.0833C5.82498 12.0833 2.42499 14.8833 2.42499 18.3333C2.42499 18.5667 2.60832 18.75 2.84165 18.75H17.1583C17.3916 18.75 17.575 18.5667 17.575 18.3333C17.575 14.8833 14.175 12.0833 9.99998 12.0833Z" fill={PRIMARYCOLOR} />
        </svg>






    )
}
export default UserIcon;