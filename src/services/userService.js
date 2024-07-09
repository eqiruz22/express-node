import prisma from "../helpers/prisma.js";
import bcrypt from "bcrypt";
class UserService {
  async getAll(page, pageSize, search) {
    try {
      let whereClause = {};
      if (search) {
        whereClause = {
          OR: [{ name: { contains: search } }, { email: { contains: search } }],
        };
      }
      const skip = (page - 1) * pageSize;
      const [data, userCount] = await Promise.all([
        await prisma.user.findMany({
          skip,
          take: pageSize,
          where: whereClause,
          orderBy: {
            name: "asc",
          },
          select: {
            id: true,
            name: true,
            is_admin: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        }),
        prisma.user.count({
          where: whereClause,
        }),
      ]);

      const totalPage = Math.ceil(userCount / pageSize);
      return {
        data,
        paginate: {
          page,
          pageSize,
          userCount,
          totalPage,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async getIdUser(id) {
    const isId = Number(id);
    if (isNaN(isId) || !Number.isInteger(isId)) {
      throw new Error("user id must be a valid integer");
    }
    try {
      const data = await prisma.user.findUnique({
        where: {
          id: isId,
        },
      });
      if (!data) {
        throw new Error(`user id ${isId} not found`);
      }
      delete data["password"];
      return data;
    } catch (error) {
      throw error;
    }
  }

  async createUser(name, email, password) {
    const hashPassword = await bcrypt.hash(password, 10);
    const requireField = ["name", "email", "password"];

    requireField.forEach((item) => {
      if (!eval(item)) {
        throw new Error(`${item} is required`);
      }
    });
    try {
      const data = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (data) {
        throw new Error("email already registered");
      }
      await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashPassword,
        },
      });
      return `success create new user`;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id, name, email, password) {
    const isId = Number(id);
    const requireField = ["name", "email"];
    const hash = await bcrypt.hash(password, 10);
    if (isNaN(isId) || !Number.isInteger(isId)) {
      throw new Error("user id must be a valid integer");
    }
    requireField.forEach((item) => {
      if (!eval(item)) {
        throw new Error(`${item} is required`);
      }
    });
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: isId,
        },
      });
      if (!user) {
        throw new Error(`user id ${id} not found`);
      }
      if (!password) {
        await prisma.user.update({
          where: {
            id: user["id"],
          },
          data: {
            name: name,
            email: email,
          },
        });
        return `update user success`;
      } else {
        prisma.user.update({
          where: {
            id: user["id"],
          },
          data: {
            name: name,
            email: email,
            password: hash,
          },
        });
        return `update user success`;
      }
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    const isId = Number(id);
    if (isNaN(isId) || !Number.isInteger(isId)) {
      throw new Error(`user id must be a valid integer`);
    }
    try {
      const data = await prisma.user.findUnique({
        where: {
          id: isId,
        },
      });
      if (!data) {
        throw new Error(`user id ${isId} not found`);
      }
      await prisma.user.delete({
        where: {
          id: isId,
        },
      });
      return `delete success`;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default UserService;
