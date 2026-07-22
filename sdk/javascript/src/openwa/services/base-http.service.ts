import { Injectable, Inject } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import type { OpenWAConfig } from '../interfaces/options.interface';

@Injectable()
export class BaseHttpService {
    public readonly ref: AxiosInstance;

    constructor(@Inject('OPENWA_OPTIONS') private options: OpenWAConfig) {
        this.ref = axios.create({
            baseURL: `${this.options.whatsappUrl}/api`,
            headers: { 
                'Content-Type': 'application/json',
                'X-API-Key': options.apiKey,
            },
        });
    }
}