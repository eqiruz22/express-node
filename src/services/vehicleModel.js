import prisma from "../helpers/prisma.js";

export class VehicleModelService {
  async getAll(page, pageSize, search) {
    try {
      let whereClause = {};
      if (search) {
        whereClause = {
          OR: [{ name: { contains: search } }],
        };
      }
      const skip = (page - 1) * pageSize;
      const [data, vmCount] = await Promise.all([
        prisma.vehicle_model.findMany({
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
            v_type: {
              select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        }),
        prisma.vehicle_model.count({
          where: whereClause,
        }),
      ]);

      const totalPage = Math.ceil(vmCount / pageSize);
      return {
        data,
        paginate: {
          page,
          pageSize,
          vmCount,
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
      throw new Error("id must be a valid integer");
    }
    try {
      const data = await prisma.vehicle_model.findUnique({
        where: {
          id: isId,
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          v_type: {
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
      throw error;
    }
  }

  async create(vtype, name) {
    const vt_id = Number(vtype);
    const requireField = ["vtype", "name"];
    if (isNaN(vt_id) || !Number.isInteger(vt_id)) {
      throw new Error(`id must be a valid integer`);
    }
    requireField.forEach((item) => {
      if (!eval(item)) {
        throw new Error(`${item} is required`);
      }
    });
    try {
      await prisma.vehicle_model.create({
        data: {
          name: name,
          v_type: vt_id,
        },
      });
      return `success created`;
    } catch (error) {
      throw error;
    }
  }

  async update(id, vtype, name) {
    const isId = Number(id);
    const vt_id = Number(vtype);
    const requireField = ["vtype", "name"];

    if (isNaN(isId) || !Number.isInteger(isId)) {
      throw new Error("id must be a valid integer");
    }
    if (isNaN(vt_id) || !Number.isInteger(vt_id)) {
      throw new Error("vehicle type must be a valid integer");
    }

    requireField.forEach((item) => {
      if (!eval(item)) {
        throw new Error(`${item} is required`);
      }
    });
    try {
      const data = await prisma.vehicle_model.findUnique({
        where: {
          id: isId,
        },
      });
      if (!data) {
        throw new Error(`id ${isId} not found`);
      }
      await prisma.vehicle_model.update({
        where: {
          id: isId,
        },
        data: {
          name: name,
          v_type: vt_id,
        },
      });
      return "update success";
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
      const data = await prisma.vehicle_model.findUnique({
        where: {
          id: isId,
        },
      });
      if (!data) {
        throw new Error(`id ${isId} not found`);
      }
      await prisma.vehicle_model.delete({
        where: {
          id: isId,
        },
      });
      return "delete success";
    } catch (error) {
      throw error;
    }
  }
}
