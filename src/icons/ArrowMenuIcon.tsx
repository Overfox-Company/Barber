import { PRIMARYCOLOR } from "@/constants/Colors";
import { PropsIconType } from "@/types/Components";
import { FC } from "react";


const ArrowMenuIcon: FC<PropsIconType> = ({ size }) => {

    return (

        <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.6825 14.94L11.5725 10.05C12.15 9.4725 12.15 8.5275 11.5725 7.95L6.6825 3.06" stroke={PRIMARYCOLOR} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>


    )
}
export default ArrowMenuIcon;