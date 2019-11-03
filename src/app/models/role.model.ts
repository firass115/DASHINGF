export class Role {
  constructor(name?: string, description?: string) {
    this.name = name;
    this.description = description;
  }

  public id: string;
  public name: string;
  public description: string;
  public usersCount: number;
}
