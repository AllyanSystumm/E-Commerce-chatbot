import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
    private readonly backendUrl = process.env.BACKEND_URL || 'http://localhost:8000/api/v1/chat/chat';

    async getChatResponse(payload: any) {
        try {
            const response = await axios.post(this.backendUrl, payload);
            return response.data;
        } catch (error) {
            return { response: 'Error connecting to backend AI service.' };
        }
    }
}
