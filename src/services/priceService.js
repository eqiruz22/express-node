import prisma from "../helpers/prisma.js";

export default class PriceService {
  async getAll(page, pageSize, search) {
    try {
      let whereClause = {};
      if (search) {
        whereClause = {
          OR: [{ code: { contains: search } }],
        };
      }
      const skip = (page - 1) * pageSize;
      const [data, priceCount] = await Promise.all([
        prisma.pricelist.findMany({
          skip,
          take: pageSize,
          where: whereClause,
          orderBy: {
            createdAt: "asc",
          },
          select: {
            id: true,
            code: true,
            price: true,
            createdAt: true,
            updatedAt: true,
            v_year: true,
            v_model: true,
          },
        }),
        prisma.pricelist.count({
          where: whereClause,
        }),
      ]);

      const totalPage = Math.ceil(priceCount / pageSize);
      return {
        data,
        paginate: {
          page,
          pageSize,
          priceCount,
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
      return new Error("id must be a valid integer");
    }
    try {
      const data = await prisma.pricelist.findUnique({
        where: {
          id: isId,
        },
        select: {
          id: true,
          code: true,
          price: true,
          createdAt: true,
          updatedAt: true,
          v_model: {
            select: {
              id: true,
              name: true,
            },
          },
          v_year: {
            select: {
              id: true,
              year: true,
            },
          },
        },
      });
      if (!data) {
        return new Error(`prices list ${id} not found`);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async create(code, price, vmid, vyid) {
    const vmId = Number(vmid);
    const vyId = Number(vyid);
    const requireField = ["code", "price", "vmid", "vyid"];
    if (isNaN(vmId) || !Number.isInteger(vmId)) {
      return new Error("vehicle model must be a valid integer");
    }
    if (isNaN(vyId) || !Number.isInteger(vyId)) {
      return new Error("vehicle year must be a valid integer");
    }
    requireField.forEach((item) => {
      if (!eval(item)) {
        return new Error(`${item} is required`);
      }
    });
    try {
      await prisma.pricelist.create({
        data: {
          code: code,
          price: price,
          model_id: vmId,
          year_id: vyId,
        },
      });
      return `success create`;
    } catch (error) {
      throw error;
    }
  }

  async update(id, code, price, vmid, vyid) {
    const isId = Number(id);
    const vmId = Number(vmid);
    const vyId = Number(vyid);
    const requireField = ["code", "price", "vmid", "vyid"];
    if (isNaN(isId) || !Number.isInteger(isId)) {
      return new Error("id must be a valid integer");
    }
    if (isNaN(vmId) || !Number.isInteger(vmId)) {
      return new Error("vehicle model must be a valid integer");
    }
    if (isNaN(vyId) || !Number.isInteger(vyId)) {
      return new Error("vehicle year must be a valid integer");
    }
    requireField.forEach((item) => {
      if (!eval(item)) {
        return new Error(`${item} is required`);
      }
    });
    try {
      const data = await prisma.pricelist.findUnique({
        where: {
          id: isId,
        },
      });
      if (!data) {
        return new Error(`price list ${isId} not found`);
      }
      await prisma.pricelist.update({
        where: {
          id: isId,
        },
        data: {
          code: code,
          price: price,
          model_id: vmId,
          year_id: vyId,
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
      return new Error(`price list id must be a valid integer`);
    }
    try {
      const data = await prisma.pricelist.findUnique({
        where: {
          id: isId,
        },
      });
      if (!data) {
        return new Error(`id ${isId} not found`);
      }
      await prisma.pricelist.delete({
        where: {
          id: isId,
        },
      });
      return `delete success`;
    } catch (error) {
      throw error;
    }
  }
}
