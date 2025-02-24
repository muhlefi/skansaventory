interface PaginateResult<T> {
    page: number;
    perPage: number;
    totalData: number;
    totalPages: number;
    items: T[];
}

export const handlePaginate = async <T>(
    model: any,
    where: object,
    include: object,
    page: number = 1,
    perPage: number = 10
): Promise<PaginateResult<T>> => {
    const skip = (page - 1) * perPage;
    const take = perPage;

    const [items, totalData] = await Promise.all([
        model.findMany({
            where,
            include,
            skip,
            take,
            orderBy: { updated_at: 'desc' },
        }),
        model.count({ where }),
    ]);

    const totalPages = Math.ceil(totalData / perPage);

    return {
        page,
        perPage,
        totalData,
        totalPages,
        items,
    };
};
