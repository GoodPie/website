export class ProjectShowcase {

  constructor(
    public isVideo: boolean,
    public link: string,
    public width = 620,
    public height = 350
  ) {}

}

export class Project {

  constructor(
    public slug: string,
    public title: string,
    public description: string,
    public showcase: ProjectShowcase,
    public url?: string
  ) {}

}
