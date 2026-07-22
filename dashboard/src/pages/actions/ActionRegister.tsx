import { useParams } from "react-router-dom";
import ActionForm from "./ActionForm";
import { useEffect } from "react";

export default function ActionRegister () {
    const { sessionId } = useParams();

    const requestData = async () => {};
    
    useEffect(() => {
        requestData();
    }, []);
    
    return (<>
    <ActionForm sessionId={sessionId as string}></ActionForm>
    </>);
}