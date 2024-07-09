import prisma from "../helpers/prisma.js";

export default class YearService {
  async getAll(page, pageSize, search) {
    try {
      let whereClause = {};
      if (search) {
        whereClause = {
          OR: [{ year: { contains: search } }],
        };
      }
      const skip = (page - 1) * size;
      const [data, vyCount] = await Promise.all([
        prisma.vehicle_year.findMany({
          skip,
          take: pageSize,
          where: whereClause,
          orderBy: {
            year: "asc",
          },
          select: {
            id: true,
            year: true,
            createdAt: true,
            updatedAt: true,
          },
        }),
        prisma.vehicle_year.count({
          where: whereClause,
        }),
      ]);
      const totalPage = Math.ceil(vyCount / pageSize);
      return {
        data,
        paginate: {
          page,
          pageSize,
          vyCount,
          totalPage,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async getId(id) {
    const isId = Number(id);
    if (isNaN(isId) || !Number.isInteger(isId)) {
      throw new Error(`id must be a valid integer`);
    }
    try {
      const data = await prisma.vehicle_year.findUnique({
        where: {
          id: isId,
        },
      });
      if (!data) {
        throw new Error(`${isId} not found`);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async create(year) {
    if (!year) {
      throw new Error(`${year} is required`);
    }
    try {
      await prisma.vehicle_year.create({
        data: {
          year: year,
        },
      });
      return `success create`;
    } catch (error) {
      throw error;
    }
  }

  async update(id, year) {
    const isId = Number(id);
    if (isNaN(isId) || !Number.isInteger(isId)) {
      throw new Error(`id must be a valid integer`);
    }
    if (!year) {
      throw new Error(`${year} is required`);
    }
    try {
      const data = await prisma.vehicle_year.findUnique({
        where: {
          id: isId,
        },
      });
      if (!data) {
        throw new Error(`${isId} not found`);
      }
      await prisma.vehicle_year.update({
        where: {
          id: isId,
        },
        data: {
          year: year,
        },
      });
      return `update success`;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    const isId = Number(id);
    if (isNaN(isId) || !Number.isInteger(isId)) {
      throw new Error(`id must be a valid integer`);
    }
    try {
      const data = await prisma.vehicle_year.findUnique({
        where: {
          id: isId,
        },
      });
      if (!data) {
        throw new Error(`${isId} not found`);
      }
      return "delete success";
    } catch (error) {
      throw error;
    }
  }
}
