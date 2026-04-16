export class BaseService<
  TDelegate extends {
    create: (...args: any[]) => any;
    findMany: (...args: any[]) => any;
    findUnique: (...args: any[]) => any;
    update: (...args: any[]) => any;
    delete: (...args: any[]) => any;
  },
> {
  constructor(protected model: TDelegate) {}

  create(args: Parameters<TDelegate["create"]>[0]) {
    return this.model.create(args);
  }

  findAll(args?: Parameters<TDelegate["findMany"]>[0]) {
    return this.model.findMany(args);
  }

  findById(args: Parameters<TDelegate["findUnique"]>[0]) {
    return this.model.findUnique(args);
  }

  update(args: Parameters<TDelegate["update"]>[0]) {
    return this.model.update(args);
  }

  delete(args: Parameters<TDelegate["delete"]>[0]) {
    return this.model.delete(args);
  }
}
