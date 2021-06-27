import {CircularProgress} from "@material-ui/core";
import React from "react";


const Loader = React.memo(() => {
    return(
        <div className={"progress"}>
            <CircularProgress size={100}/>
        </div>
    )
})

export default Loader