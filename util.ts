/*
 * Copyright (c) 2019-2025 by xcube team and contributors
 * Permissions are hereby granted under the terms of the MIT License:
 * https://opensource.org/licenses/MIT.
 */

import { isNumber } from "@/util/types";

// Helper function to format time as YYYY-MM HH:MM (without day and seconds)
const formatDateTimeWithoutSeconds = (time: number): string => {
  const date = new Date(time);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  
  return `${year}-${month} ${hours}:${minutes}`;
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