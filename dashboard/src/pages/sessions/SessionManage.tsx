import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../services/api";
import ActionsListPanel from "../actions/ActionsListPanel";

export default function SessionManage() {
    const { sessionId } = useParams();
    let [session, setSession] = useState<any>(undefined);

    const requestData = async () => {
        const s = await api.sessions.getById(sessionId as string);
        setSession(s);
    }

    useEffect(() => {
        requestData();
    }, []);

    return (<>
        {session &&
            <section className="section">
                <h1 className="title">Manage session: <span className="has-text-info">{session.name}</span></h1>
                <div>
                    <div>
                        <div>
                            <Link to="../action/register" className="button is-success">Add Action</Link>
                        </div>
                    </div>

                    <div className="tabs is-centered" hidden>
                        <ul>
                            <li className="is-active"><a>Actions</a></li>
                        </ul>
                    </div>

                    <div>
                        <ActionsListPanel sessionId={sessionId as string} sessionName={session.name}></ActionsListPanel>
                    </div>
                </div>
            </section>}
    </>);
}