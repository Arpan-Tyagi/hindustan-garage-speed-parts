import { WorkshopStatus } from '../types';

/**
 * Computes workshop operating status according to Indian Standard Time (IST: UTC+05:30)
 * Operating Hours: Monday to Saturday, 10:00 IST to 20:00 IST.
 * Location: 56, M.G. Marg, Civil Lines, Prayagraj.
 */
export function getWorkshopStatus(customDate?: Date): WorkshopStatus {
  const now = customDate || new Date();
  
  // Unix epoch timestamp in milliseconds (always absolute UTC)
  // IST is UTC + 5 hours 30 minutes
  const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(now.getTime() + IST_OFFSET_MS);

  // Read UTC components of the adjusted date to get exact IST values anywhere in the world
  const dayOfWeek = istDate.getUTCDay(); // 0 is Sunday, 1 is Mon, ..., 6 is Sat
  const hours = istDate.getUTCHours();
  const minutes = istDate.getUTCMinutes();
  const totalMinutes = hours * 60 + minutes;

  const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const currentDay = dayNames[dayOfWeek];

  const pad = (n: number) => n.toString().padStart(2, '0');
  const istTimeString = `${pad(hours)}:${pad(minutes)} IST`;

  // Open Mon-Sat (1 to 6) between 10:00 (600 mins) and 20:00 (1200 mins)
  const isWorkingDay = dayOfWeek >= 1 && dayOfWeek <= 6;
  const isWithinHours = totalMinutes >= 600 && totalMinutes < 1200;
  const isOpen = isWorkingDay && isWithinHours;

  let statusBadge = '';
  let nextOpenNotice = '';

  if (isOpen) {
    statusBadge = `OPEN NOW · UNTIL 20:00 IST`;
    nextOpenNotice = `Workshop active. Walk-in and bay triage open at 56, M.G. Marg.`;
  } else if (dayOfWeek === 0) {
    statusBadge = `CLOSED SUNDAY`;
    nextOpenNotice = `Reopens Monday at 10:00 IST. Emergency towing helpline active.`;
  } else if (totalMinutes < 600) {
    statusBadge = `OPENS TODAY AT 10:00 IST`;
    nextOpenNotice = `Workshop preparation in progress. Online slot bookings processed continuously.`;
  } else {
    const nextDay = dayOfWeek === 6 ? 'Monday' : 'tomorrow';
    statusBadge = `CLOSED FOR THE DAY`;
    nextOpenNotice = `Reopens ${nextDay} at 10:00 IST. Digital bookings remain open 24/7.`;
  }

  return {
    isOpen,
    currentDay,
    istTimeString,
    statusBadge,
    nextOpenNotice
  };
}
