import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { ActionFunction } from "./action-function.entity";
import { Session } from "@ivy-eco/core/modules/session/entities/session.entity";
import { Extension } from "@ivy-eco/core/modules/extension/entities/extension.entity";
import { ValuesField } from "@ivy-eco/sdk/common/interfaces/fields.interface";
import { ActionGroup } from "./action-group.entity";

@Entity({ name: "actions" })
export class Action {
    @PrimaryGeneratedColumn({ name: "action_id"})
    id!: number;

    @Column({ type: "text"})
    command!: string;

    @Column("simple-json", { name: "values" })
    values!: ValuesField[];

    @ManyToOne(() => Session, (session) => session.actions)
    @JoinColumn({ name: "session_id" })
    session!: Session;

    @ManyToOne(() => Extension, (extension) => extension.actions)
    @JoinColumn({ name: "extension_id" })
    extension!: Extension;

    @OneToMany(() => ActionFunction, (actFun) => actFun.action)
    functions!: ActionFunction[]

    @OneToMany(() => ActionGroup, (actGroup) => actGroup.action)
    groups!: ActionGroup[]
}
