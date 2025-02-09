import { Context } from 'hono'

export const baseResponse = {
    success: <T>(c: Context, data: T, message?: string) => 
        c.json({ success: true, message: message || 'Success', data }, 200),

    show: <T>(c: Context, data: T, message?: string) => 
        c.json({ success: true, message: message || 'Success', data }, 200),

    deleted: (c: Context, message?: string) => 
        c.json({ success: true, message: message || 'Deleted successfully', data: null }, 200),

    updated: <T>(c: Context, data: T, message?: string) => 
        c.json({ success: true, message: message || 'Updated successfully', data }, 200),

    created: <T>(c: Context, data: T, message?: string) => 
        c.json({ success: true, message: message || 'Created successfully', data }, 201),

    error: (c: Context, message: string, status: number = 400) => {
        let errorMessage;
        try {
            errorMessage = JSON.parse(message);
        } catch (_) {
            errorMessage = message;
        }
        return c.json({ success: false, message: errorMessage}, status as any)
    }
}
