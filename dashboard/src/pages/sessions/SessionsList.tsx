import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "../../services/api";

export default function SessionsList() {
  let [sessions, setSessions] = useState<any>(undefined);

  const requestSessions = async () => {
    const regs = await api.sessions.getRegistered();

    if ('statusCode' in regs) {
      console.error(`Error ${regs.statusCode}: ${regs.message}`);
    } else if (!regs.success) {
       console.log(regs.reason);
    } else {
      const s = regs.data;
      setSessions(s)
    }
  }

  useEffect(() => {
    requestSessions();
  }, [])

  return (
    <>
      <section className="section">
        <nav className="panel is-primary">
          <p className="panel-heading">Sessions</p>
          <div className="panel-block" style={{ display: "none" }}>
            <p className="control has-icons-left">
              <input className="input" type="text" placeholder="Search" />
              <span className="icon is-left">
                <i className="fas fa-search" aria-hidden="true"></i>
              </span>
            </p>
          </div>

          {sessions && sessions.registered.map((s: any) =>
            <div key={s.id} className="panel-block">
              <div className="is-flex is-align-items-center is-justify-content-space-between w-100">
                <div>{s.name}</div>
                <div className="is-flex is-right">
                  <Link className="button is-info" to={`${s.id}/manage`}>Manage</Link>
                </div>
              </div>
            </div>
          )}

          {sessions && sessions.notRegistered.map((s: any) =>
            <div key={s.id} className="panel-block">
              <div className="is-flex is-align-items-center is-justify-content-space-between w-100">
                <div>{s.name}</div>
                <div className="is-flex is-right">
                  <Link className="button is-success" to={`${s.id}/register`}>Register</Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </section>
    </>
  )
}