import type { ExtensionModel } from "../../models/extension.model";
import { http } from "./http";

export const extensionsApi = {
    getList: () => http.get<ExtensionModel[]>(`/extensions`),
    getById: (extensionId: number) => http.get<ExtensionModel[]>(`/extensions/${extensionId}`)
};