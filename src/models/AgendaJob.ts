interface AgendaJob {
  _id: string;
  name: string;
  data: object;
  type: string;
  nextRunAt: Date;
  lastModifiedBy: string;
  lockedAt: string;
  lastFinishedAt: Date;
}

export default AgendaJob;
