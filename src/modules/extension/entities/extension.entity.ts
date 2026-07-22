import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable, Index } from "typeorm";
import { ExtFunction } from "./ext-function.entity";
import { Action } from "src/modules/action/entities/action.entity";
import { InputsField } from "@ivy-eco/sdk/common/interfaces/fields.interface";

@Entity({ name: "extensions" })
export class Extension {
    @PrimaryGeneratedColumn({ name: "extension_id"})
    id: number;

    @Column({ type: "text"})
    name: string;

    @Column({ type: "text"})
    endpoint: string;
    
    @Column("simple-json", { name: "events" })
    events: string[];

    @Column("simple-json", { nullable: true })
    inputs: InputsField[];

    @OneToMany(() => ExtFunction, (extFun) => extFun.extension)
    functions: ExtFunction[]

    @OneToMany(() => Action, (action) => action.extension)
    actions: Action[]
}
