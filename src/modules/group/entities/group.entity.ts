import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn } from "typeorm";
import { ActionGroup } from "../../action/entities/action-group.entity";

@Entity({ name: "groups" })
export class Group {
    @PrimaryColumn({ name: "group_id", type: "text" })
    id!: string

    @Column({ type: "text"})
    name!: string;

    @OneToMany(() => ActionGroup, (actGroup) => actGroup.group)
    @JoinColumn({ name: "action_id" })
    actions!: ActionGroup[];
}
