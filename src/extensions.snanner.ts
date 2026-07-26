import { join } from 'path';
import { readdirSync, statSync } from 'fs';
import { ExtensionDefinition } from './modules/extension/extension.interface';
import { pathToFileURL } from 'url';
import { Logger, Type } from '@nestjs/common';

export async function loadExtensionsDynamically(): Promise<ExtensionDefinition[]> {
  const extensionsBaseDir = join(process.cwd(), 'extensions');
  const extensionsList: ExtensionDefinition[] = [];

  const folders = readdirSync(extensionsBaseDir).filter(file =>
    statSync(join(extensionsBaseDir, file)).isDirectory()
  );

  for (const folder of folders) {
    const folderPath = join(extensionsBaseDir, folder);
    const files = readdirSync(folderPath);
    const extensionFile = files.find(file => file.endsWith('.extension.js'));

    if (extensionFile) {
      const extensionPath = join(folderPath, extensionFile);
      const importedExtension: ImportedExtension = await import(pathToFileURL(extensionPath).href);

      if (importedExtension.default) {
        const extensionClass = Object.values(importedExtension.default)[0];
        extensionsList.push({ module: extensionClass });
        Logger.log(`Reading "${folder}" extension.`, "ExtensionScanner")
      }
    }
  }

  return extensionsList;
}

interface ImportedExtension {
  default: ExtensionExport;
}

interface ExtensionExport {
  [key: string]: Type<any>;
}