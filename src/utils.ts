import { Interval } from 'luxon'
import type { Timeframe } from './types/entities'

export const parseTimeframe = (timeframe: Timeframe) => {
  const resolve: Record<Timeframe['type'], Interval> = {
    DAILY: Interval.fromDateTimes({ h }),
    WEEKLY: Interval.fromDateTimes({ w }),
    MONTHLY: Interval.fromDateTimes({ day: timeframe.value }),
    YEARLY: Interval.fromDateTimes({ y }),
  }
  return Interval.fromDateTimes({})
}
