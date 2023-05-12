export class Movie {
  id: number;
  title: string;
  year: number;

  public constructor(id: number, title: string, year: number) {
    this.id = id;
    this.title = title;
    this.year = year;
  }
}
