import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Action } from "./action.entity";
import { Group } from "../../group/entities/group.entity";

@Entity({ name: "action_groups" })
export class ActionGroup {
    @PrimaryGeneratedColumn({ name: "actiongroup_id"})
    id!: number;

    @ManyToOne(() => Action, (action) => action.groups)
    @JoinColumn({ name: "action_id" })
    action!: Action;

    @ManyToOne(() => Group, (group) => group.actions)
    @JoinColumn({ name: "group_id" })
    group!: Group;
}
