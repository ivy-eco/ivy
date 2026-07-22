import { ModuleRef } from '@nestjs/core';
import { Injectable, OnApplicationBootstrap, Inject, Logger } from '@nestjs/common';
import { ExtensionDefinition } from './extension.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Extension } from './entities/extension.entity';
import { Repository } from 'typeorm';
import { ExtFunction } from './entities/ext-function.entity';
import { InputsField } from '@ivy-eco/sdk/common/interfaces/fields.interface';

interface FunctionTable { 
  command: string, 
  methodName: string, 
  inputs: string[] 
}

interface ExtensionRegistry{ 
  name: string; 
  functions: FunctionTable[], 
  serviceClass: any,
  serviceInputs: InputsField[]
}

interface ExtensionTable {
  name: string, 
  functionNames: FunctionTable[], 
  endpoint: string, 
  events:string[];
  serviceInputs: InputsField[];
}

@Injectable()
export class ExtensionRegistryService implements OnApplicationBootstrap {
  private registry: ExtensionRegistry[] = [];

  constructor(
    @Inject('EXTENSIONS_LIST') private readonly extensions: ExtensionDefinition[],
    private readonly moduleRef: ModuleRef,
    @InjectRepository(Extension)
    private extensionRepository: Repository<Extension>,
    @InjectRepository(ExtFunction)
    private functionRepository: Repository<ExtFunction>,
  ) { }

  onApplicationBootstrap() {
    this.extensions.forEach(async ext => {
      const providers = Reflect.getMetadata('providers', ext.module) || [];

      const serviceClass = providers.find(p =>
        Reflect.getMetadata('is_extension_service', p) === true
      );

      if (serviceClass) {
        const serviceInstance = this.moduleRef.get(serviceClass, { strict: false });
        const map = (serviceInstance.constructor as any)._extensionFunctionMap || {};

        const serviceInputs = Reflect.getMetadata('service_inputs', serviceClass) || [];

        const endpoint = serviceInstance.endpoint;
        const events = serviceInstance.events;

        const functions = Object.entries(map).map(([command, config]: [string, any]) => ({
            command,
            methodName: config.methodName,
            inputs: config.inputs
        }));

        const name = ext.module.name.replace('Extension', '');

        this.registry.push({ name, functions, serviceClass, serviceInputs });

        await this.saveToDatabase({name, functionNames: functions, endpoint, events, serviceInputs});

        Logger.log(`Extension "${name}" registered.`, "ExtensionRegistry")
      }
    });
  }

  getRegistry() {
    return this.registry;
  }

  getCatalog() {
    return this.registry.map(r => ({
      name: r.name,
      functions: r.functions.map(f => ({ command: f.command, inputs: f.inputs })),
      inputs: r.serviceInputs
    }))
  }

  private async saveToDatabase({name, functionNames, endpoint, events, serviceInputs}: ExtensionTable) {
    let extension = await this.extensionRepository.findOneBy({ name });
    if (!extension) extension = await this.extensionRepository.save({ name, endpoint, events, inputs: serviceInputs });

    for (const f of functionNames) {
      let extFunc = await this.functionRepository.findOne({
        where: { command: f.command, extension: { id: extension.id } }
      });

      if (extFunc) {
        extFunc.name = f.methodName;
        extFunc.inputs = f.inputs;
        await this.functionRepository.save(extFunc);
      } else {
        await this.functionRepository.save({
          command: f.command,
          name: f.methodName,
          inputs: f.inputs,
          extension,
        });
      }
    }
  }
}