import prisma from "../helpers/prisma.js";

export class VehicleTypeService {
  async getAll(page, pageSize, search) {
    try {
      let whereClause = {};
      if (search) {
        whereClause = {
          OR: [
            { name: { contains: search } },
            { v_brand: { some: { name: { contains: search } } } },
          ],
        };
      }
      const skip = (page - 1) * pageSize;
      const data = await prisma.vehicle_type.findMany({
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
          v_brand: {
            select: {
              id: true,
              name: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });
      const vtCount = await prisma.vehicle_type.count({
        where: whereClause,
      });
      const totalPage = Math.ceil(vtCount / pageSize);
      return {
        data,
        paginate: {
          page,
          pageSize,
          vtCount,
          totalPage,
        },
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getId(id) {
    const isId = Number(id);
    if (isNaN(isId) || !Number.isInteger(isId)) {
      throw new Error(`id must be a valid integer`);
    }
    try {
      const data = await prisma.vehicle_type.findUnique({
        where: {
          id: isId,
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          v_brand: {
            select: {
              id: true,
              name: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });
      if (!data) {
        throw new Error(`id ${isId} not found`);
      }
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(vbid, name) {
    const vb_id = Number(vbid);
    if (isNaN(vb_id) || !Number.isInteger(vb_id)) {
      throw new Error("vehicle brand must be a valid integer");
    }
    const requireField = ["vbid", "name"];
    requireField.forEach((item) => {
      if (!eval(item)) {
        throw new Error(`${item} is required`);
      }
    });
    try {
      await prisma.$transaction([
        prisma.vehicle_type.create({
          data: {
            name: name,
            brand_id: vb_id,
          },
        }),
      ]);
      return "created";
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id, vbid, name) {
    const isId = Number(id);
    const vb_id = Number(vbid);
    const requireField = ["vbid", "name"];
    if (isNaN(isId) || !Number.isInteger(vb_id)) {
      throw new Error("id must be a valid integer");
    }
    if (isNaN(isId) || !Number.isInteger(vb_id)) {
      throw new Error("id must be a valid integer");
    }
    requireField.forEach((item) => {
      if (!eval(item)) {
        throw new Error(`${item} is required`);
      }
    });
    try {
      const data = await prisma.vehicle_type.findUnique({
        where: {
          id: isId,
        },
      });
      if (!data) {
        throw new Error(`id ${isId} not found`);
      } else {
        await prisma.$transaction([
          prisma.vehicle_type.update({
            where: {
              id: isId,
            },
            data: {
              name: name,
              brand_id: vb_id,
            },
          }),
        ]);
        return `update success`;
      }
    } catch (error) {}
  }

  async destroy(id) {
    const isId = Number(id);
    if (isNaN(isId) || !Number.isInteger(isId)) {
      throw new Error(`id must be a valid integer`);
    }
    try {
      const data = await prisma.vehicle_type.findUnique({
        where: {
          id: isId,
        },
      });
      if (!data) {
        throw new Error(`id ${isId} not found`);
      } else {
        await prisma.$transaction([
          prisma.vehicle_type.delete({
            where: {
              id: isId,
            },
          }),
        ]);
        return `Deleted`;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
