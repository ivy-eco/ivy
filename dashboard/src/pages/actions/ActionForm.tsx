import { useEffect, useState, type ChangeEvent, type SubmitEvent } from "react";
import TextInput from "../../components/TextInput";
import type { ExtensionModel, InputParam } from "../../models/extension.model";
import { api, type HTTPError } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { waApi } from "../../services/waApi";
import type { RegisterActionBody } from "../../models/action.model";

export default function ActionForm({ sessionId }: { sessionId: string }) {

    const [extensions, setExtensions] = useState<ExtensionModel[]>([]);
    const [selectedExtension, setSelectedExtension] = useState<ExtensionModel | undefined>(undefined);

    const [groups, setGroups] = useState<{ id: string, name: string }[]>([]);
    const [selectedGroups, setSelectedGroups] = useState<any[]>([]);

    const navigate = useNavigate();

    const onSubmitAction = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (!selectedExtension)
            return;

        const action = {
            command: data.get("command"),
            groups: selectedGroups,
            extension: selectedExtension.name,
            values: selectedExtension.inputs.map(i => ({
                name: i.name,
                value: data.get(`ext-input-${i.name}`) as string
            })),
            functions: selectedExtension.functions.map(f => ({
                extension: selectedExtension.name,
                function: data.get(`${f.command}-fun`),
                command: data.get(`${f.command}-com`),
            }))
            ,

        } as any as RegisterActionBody;
        console.log("action", action)

        const res = await api.actions.register(sessionId, action);

        if (res.success) {
            navigate("../")
        }
    }

    const updateGroups = (e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
        const gs = Array.from(e.target.selectedOptions, (option: HTMLOptionElement) => option.value);
        setSelectedGroups(gs);
    };

    const requestData = async () => {
        const es = await api.extensions.getList();
        const er = es as HTTPError;

        if (er.error) {
            console.log(er.message);
            return;
        }

        const extensions = es as ExtensionModel[];
        setExtensions(extensions);
        setSelectedExtension(extensions[0]);

        const gs = await waApi.groups.getList(sessionId);
        if(gs.statusCode){
            console.log(gs)
            return;
        }
        setGroups(gs)
    };

    const onExtensionChange = (e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
        const index = Number(e.target.value);
        setSelectedExtension(undefined)
        setSelectedExtension(extensions[index]);
    }

    useEffect(() => {
        requestData();
    }, []);

    return (<>
        {groups.length != 0 && extensions.length != 0 &&
            <div className="box my-2">
                <form onSubmit={onSubmitAction}>
                    <h5 className="title is-5">Action</h5>
                    <TextInput name="command" label="Command" value="" required={true} className="mb-5"></TextInput>

                    <div className="field is-horizontal">
                        <div className="field-label">
                            <label className="label">Groups</label>
                        </div>

                        <div className="field-body">
                            <div className="field is-narrow">
                                <div className="control">
                                    <div className="select is-multiple">
                                        <select multiple size={2} onChange={e => updateGroups(e)} required>
                                            {groups && groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Extension</label>
                        </div>

                        <div className="field-body">
                            <div className="field">
                                <div className="control is-expanded">
                                    <div className="select is-fullwidth">
                                        <select onChange={(e) => onExtensionChange(e)}>
                                            {extensions.map((e, index) => <option key={`ex${index}`} value={index}>{e.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {selectedExtension && <InputsForm inputs={selectedExtension.inputs} ></InputsForm>}

                    {selectedExtension &&
                        <div className="my-2 has-border has-border-primary pt-4 pb-5 px-5 is-rounded" key={selectedExtension.name}>
                            <h5 className="title is-5">Functions</h5>
                            {
                                selectedExtension.functions.map((f, index) =>
                                    <div hidden={f.command == "_default"} key={`func-${index}`}>
                                        <div className="field has-addons" key={`fn${index}`}>
                                            <p className="control">
                                                <input className="button is-static" defaultValue={f.command} name={`${f.command}-fun`} required />
                                            </p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    }

                    <div className="buttons is-right my-4">
                        <button className="button is-success" type="submit">Guardar</button>
                        <button className="button is-light" type="button">Cancelar</button>
                    </div>
                </form>
            </div>
        }
    </>);
}

function InputsForm({ inputs }: { inputs: InputParam[] }) {
    return inputs.map((i, index) => {
        if (i.input === "input-text") {
            return (<TextInput key={`in${index}`} label={i.name} name={`ext-input-${i.name}`} value="" required={true}></TextInput>);
        }

        if (i.input === "input-password") {
            return (<TextInput key={`in${index}`} label={i.name} name={`ext-input-${i.name}`} value="" required={true} type="password"></TextInput>);
        }

        if (i.input === "textarea") {
            return (<textarea key={`in${index}`} className="textarea" name={`ext-input-${index}`}></textarea>);
        }

        return (<></>);
    });
}