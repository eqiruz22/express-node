import prisma from "../helpers/prisma.js";

export class VehicleBrandService {
  async getAll(page, pageSize, search) {
    try {
      let whereClause = {};
      if (search) {
        whereClause = {
          OR: [{ name: { contains: search } }],
        };
      }
      const skip = (page - 1) * pageSize;
      const data = await prisma.vehicle_brand.findMany({
        skip,
        take: pageSize,
        where: whereClause,
        orderBy: {
          name: "asc",
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      const vbCount = await prisma.vehicle_brand.count({
        where: whereClause,
      });
      const totalPage = Math.ceil(vbCount / pageSize);
      return {
        data,
        paginate: {
          page,
          pageSize,
          vbCount,
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
      const data = await prisma.vehicle_brand.findUnique({
        where: {
          id: isId,
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      if (!data) {
        throw new Error(`id ${isId} not found`);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async create(name) {
    if (!name) {
      throw new Error(`name is required`);
    }
    try {
      await prisma.$transaction([
        prisma.vehicle_brand.create({
          data: {
            name: name,
          },
        }),
      ]);
      return `create success`;
    } catch (error) {
      throw error;
    }
  }

  async update(id, name) {
    const isId = Number(id);
    if (isNaN(isId) || !Number.isInteger(isId)) {
      throw new Error(`id must be a valid integer`);
    }
    if (!name) {
      throw new Error(`name is required`);
    }
    try {
      const data = await prisma.vehicle_brand.findUnique({
        where: {
          id: isId,
        },
      });
      if (!data) {
        throw new Error(`id ${isId} not found`);
      }
      await prisma.$transaction([
        prisma.vehicle_brand.update({
          where: {
            id: isId,
          },
          data: {
            name: name,
          },
        }),
      ]);
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
      const data = await prisma.vehicle_brand.findUnique({
        where: {
          id: isId,
        },
      });
      if (!data) {
        throw new Error(`id ${isId} not found`);
      }
      await prisma.$transaction([
        prisma.vehicle_brand.delete({
          where: {
            id: isId,
          },
        }),
      ]);
      return `delete success`;
    } catch (error) {
      throw error;
    }
  }
}
