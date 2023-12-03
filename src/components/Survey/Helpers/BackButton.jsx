import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function BackButton(){
    return(
        <Link to={'/'} className="backButton">
            <Button color="primary" variant="flat">
                Back
            </Button>
        </Link>
    );
}