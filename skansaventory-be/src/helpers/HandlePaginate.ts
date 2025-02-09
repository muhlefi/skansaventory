interface PaginateResult<T> {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    items: T[];
}

export const handlePaginate = async <T>(
    model: any,
    where: object,
    page: number = 1,
    perPage: number = 10
): Promise<PaginateResult<T>> => {
    const skip = (page - 1) * perPage;
    const take = perPage;

    const [items, totalItems] = await Promise.all([
        model.findMany({
            where,
            skip,
            take,
            orderBy: { updated_at: 'desc' },
        }),
        model.count({ where }),
    ]);

    const totalPages = Math.ceil(totalItems / perPage);

    return {
        page,
        perPage,
        totalItems,
        totalPages,
        items,
    };
};
