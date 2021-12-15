import { STATUS_TYPE } from '../types/updatedTask.type';

export default class StatusPointUtil {
  public static totalStatus(
    technology: number,
    achievement: number,
    solution: number,
    motivation: number,
    design: number,
    plan: number,
  ) {
    return technology + achievement + solution + motivation + design + plan;
  }

  public static highStatus(
    technology: number,
    achievement: number,
    solution: number,
    motivation: number,
    design: number,
    plan: number,
  ) {
    const statusObject = [
      {
        status_name: STATUS_TYPE.TECHNOLOGY,
        point: technology,
      },
      {
        status_name: STATUS_TYPE.ACHIEVEMENT,
        point: achievement,
      },
      {
        status_name: STATUS_TYPE.SOLUTION,
        point: solution,
      },
      {
        status_name: STATUS_TYPE.MOTIVATION,
        point: motivation,
      },
      {
        status_name: STATUS_TYPE.DESIGN,
        point: design,
      },
      {
        status_name: STATUS_TYPE.PLAN,
        point: plan,
      },
    ];
    statusObject.sort((a, b) => b.point - a.point);

    return statusObject[0];
  }
}
