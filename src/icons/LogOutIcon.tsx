import { PRIMARYCOLOR } from "@/constants/Colors";
import { PropsIconType } from "@/types/Components";
import { FC } from "react";


const LogOutIcon: FC<PropsIconType> = ({ size }) => {

    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M11.0333 1.66667C11.425 1.66667 11.75 1.98334 11.75 2.38334V17.625C11.75 18.0167 11.4333 18.3417 11.0333 18.3417C6.12501 18.3417 2.70001 14.9167 2.70001 10.0083C2.70001 5.10001 6.13335 1.66667 11.0333 1.66667Z" fill={PRIMARYCOLOR} />
            <path d="M17.1167 9.61666L14.75 7.24166C14.5083 6.99999 14.1083 6.99999 13.8667 7.24166C13.625 7.48333 13.625 7.88333 13.8667 8.12499L15.1667 9.42499H7.19168C6.85001 9.42499 6.56668 9.70833 6.56668 10.05C6.56668 10.3917 6.85001 10.675 7.19168 10.675H15.1667L13.8667 11.975C13.625 12.2167 13.625 12.6167 13.8667 12.8583C13.9917 12.9833 14.15 13.0417 14.3083 13.0417C14.4667 13.0417 14.625 12.9833 14.75 12.8583L17.1167 10.4833C17.3583 10.25 17.3583 9.85833 17.1167 9.61666Z" fill={PRIMARYCOLOR} />
        </svg>



    )
}
export default LogOutIcon;