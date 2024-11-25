import React, {useState} from "react"
import GuestHome from "./GuestHome";
import GuestHeader from "../common/GuestHeader";

const Guest = () => {

    return (
        <>
            <div className="">
                <GuestHeader />

                <div>
                    <GuestHome/>
                </div>

            </div>
        </>
    )
}

export default Guest;
