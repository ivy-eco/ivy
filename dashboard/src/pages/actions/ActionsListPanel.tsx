import { useEffect, useState, type SubmitEvent } from "react";
import { api, type HTTPError } from "../../services/api";
import { Link } from "react-router-dom";
import { formToObject } from "../sessions/SessionRegister";
import { RegisterActionSchema, type ActionModel, type RegisterActionBody } from "../../models/action.model"

interface ActionListParams { 
    sessionId: string;
    sessionName: string;
}

export default function ActionsListPanel ({sessionId, sessionName}: ActionListParams) {
    let [actions, setActions] = useState<ActionModel[] | undefined>(undefined);
    let [currentAction, setCurrentAction] = useState<ActionModel | undefined>(undefined);
    let [isShowingModal, setModalState] = useState<boolean>(false);

    const requestData = async () => {
        (sessionName as string).toString()
        const as = await api.actions.getListBySessionId(sessionId);
        const er = as as HTTPError;

        if(er.error){
            console.log(er.message);
            return;
        }
        console.log(as)
        setActions(as as ActionModel[]);
    }

    const closeModal = () => {
        setCurrentAction(undefined);
        setModalState(false)
    }

    const tryToRegister = async (event:SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const b: RegisterActionBody = formToObject<RegisterActionBody>(event, RegisterActionSchema);
        const res = await api.actions.register(sessionId, b);

        if(res.success){
            closeModal();
        }
    }

    useEffect(() => {
        requestData();
    }, []);

    return (actions && 
    <>
        <nav className="panel is-primary">
            <p className="panel-heading">Actions</p>
            {actions.map(a => (
            <div className="panel-block" key={"act-" + a.id}>
                <div className="is-flex is-align-items-center is-justify-content-space-between w-100">
                    <div>
                        <div className="has-text-info">{a.extension.name}</div>
                        <div className="has-text-success">{a.command}</div>
                        <div>{a.selectedGroups}</div>
                    </div>
                    <div className="is-flex is-right">
                        <Link className="button is-info" relative="path" to={`../action/${a.id}`}>Manage</Link>
                    </div>
                </div>
            </div>
            ))}
        </nav>
    
        {currentAction &&
        <div className={`modal ${isShowingModal ? "is-active": ""}`}>
            <div className="modal-background"></div>
            <form onSubmit={tryToRegister}>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Register route</p>
                        <button className="delete" aria-label="close" onClick={()=>closeModal()}></button>
                    </header>

                    <footer className="modal-card-foot">
                        <div className="buttons">
                            <button className="button is-success">Save changes</button>
                            <button type="button" className="button" onClick={()=>closeModal()}>Cancel</button>
                        </div>
                    </footer>
                </div>
            </form>
        </div>}
    </>);
}