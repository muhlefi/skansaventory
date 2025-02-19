import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PaginateResult<T> {
    page: number;
    perPage: number;
    totalData: number;
    totalPages: number;
    items: T[];
}

export const handlePaginateRaw = async <T>(
    viewName: string,
    searchFields: string[],
    search: string,
    page: number = 1,
    perPage: number = 10
): Promise<PaginateResult<T>> => {
    const skip = (page - 1) * perPage;
    
    const whereClause = searchFields
        .map((field) => `${field} LIKE ?`)
        .join(' OR ');

    const params = searchFields.map(() => `%${search}%`);
    const sqlQuery = `
        SELECT * FROM ${viewName}
        WHERE (${whereClause})
        ORDER BY updated_at DESC
        LIMIT ? OFFSET ?
    `;

    const items = await prisma.$queryRawUnsafe<T[]>(sqlQuery, ...params, perPage, skip);

    const countQuery = `
        SELECT COUNT(*) as count FROM ${viewName}
        WHERE (${whereClause})
    `;
    const totalDataResult = await prisma.$queryRawUnsafe<{ count: number }[]>(countQuery, ...params);
    const totalData = parseInt(totalDataResult[0]?.count.toString() || '0', 10);

    const totalPages = Math.ceil(totalData / perPage);

    return {
        page,
        perPage,
        totalData,
        totalPages,
        items,
    };
};
