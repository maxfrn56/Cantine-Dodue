import { HOURS } from "./data";

export function getTodayIndex(date = new Date()) {
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
}

function toMinutes(stamp: string) {
  const [hours, minutes] = stamp.split(":").map(Number);
  return hours * 60 + minutes;
}

function formatMinutes(total: number) {
  const hours = String(Math.floor(total / 60)).padStart(2, "0");
  const minutes = String(total % 60).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function getOpenStatus(now = new Date()) {
  const today = HOURS[getTodayIndex(now)];

  if (today.closed) {
    return { open: false, label: "Fermé aujourd’hui" };
  }

  const slots = today.service.split("·").map((slot) => {
    const [start, end] = slot.split("–").map((part) => part.trim());
    return { start: toMinutes(start), end: toMinutes(end) };
  });

  const current = now.getHours() * 60 + now.getMinutes();
  const ongoing = slots.find((slot) => current >= slot.start && current < slot.end);

  if (ongoing) {
    return { open: true, label: `Ouvert · jusqu’à ${formatMinutes(ongoing.end)}` };
  }

  const upcoming = slots.find((slot) => current < slot.start);
  if (upcoming) {
    return { open: false, label: `Ouvre à ${formatMinutes(upcoming.start)}` };
  }

  return { open: false, label: "Service terminé" };
}
