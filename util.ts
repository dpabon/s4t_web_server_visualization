/*
 * Copyright (c) 2019-2025 by xcube team and contributors
 * Permissions are hereby granted under the terms of the MIT License:
 * https://opensource.org/licenses/MIT.
 */

import { isNumber } from "@/util/types";

// Helper function to format time intelligently
// Shows YYYY-MM-DD HH:MM if time is present, otherwise just YYYY-MM-DD
const formatDateTimeWithoutSeconds = (time: number): string => {
  const date = new Date(time);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  
  // Check if there's actual time information (not midnight 00:00)
  const hasTime = hours !== 0 || minutes !== 0;
  
  if (hasTime) {
    const hoursStr = String(hours).padStart(2, '0');
    const minutesStr = String(minutes).padStart(2, '0');
    return `${year}-${month}-${day} ${hoursStr}:${minutesStr}`;
  } else {
    // Only date, no time
    return `${year}-${month}-${day}`;
  }
};

export const formatTimeTick = (value: number | string) => {
  if (!isNumber(value) || !Number.isFinite(value)) {
    return "";
  }
  return formatDateTimeWithoutSeconds(value);
};

export const formatValueTick = (value: number) => {
  return value.toPrecision(3);
};