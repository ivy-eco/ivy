import { Action } from "src/modules/action/entities/action.entity";
import { Entity, Column, JoinTable, PrimaryColumn, OneToMany } from "typeorm";

@Entity({ name: "sessions" })
export class Session {
    @PrimaryColumn({ name: "session_id", type: "text" })
    id: string

    @Column({ type: "text"})
    name: string

    @Column({ type: "text"})
    description: string

    @Column({ type: "text"})
    phone: string;

    @OneToMany(() => Action, (action) => action.session)
    @JoinTable({ name: "session_routes" })
    actions: Action[];
}
