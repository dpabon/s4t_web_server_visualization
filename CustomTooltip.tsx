/*
 * Copyright (c) 2019-2025 by xcube team and contributors
 * Permissions are hereby granted under the terms of the MIT License:
 * https://opensource.org/licenses/MIT.
 */

import { TooltipProps } from "recharts";
import { Payload as TooltipPayload } from "recharts/types/component/DefaultTooltipContent";
import { utcTimeToIsoDateTimeString } from "@/util/time";
import { isNumber } from "@/util/types";
import { makeStyles } from "@/util/styles";
import Box from "@mui/material/Box";

const styles = makeStyles({
  toolTipContainer: (theme) => ({
    backgroundColor: "black",
    opacity: 0.8,
    color: "white",
    border: "2px solid black",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1.5),
  }),
  toolTipValue: {
    fontWeight: "bold",
  },
  toolTipLabel: (theme) => ({
    fontWeight: "bold",
    paddingBottom: theme.spacing(1),
  }),
});

const INVISIBLE_LINE_COLOR = "#00000000";
const SUBSTITUTE_LABEL_COLOR = "#FAFFDD";

type CustomTooltipProps = TooltipProps<number, string>;

export default function CustomTooltip({
  active,
  label,
  payload,
}: CustomTooltipProps) {
  if (!active) {
    return null;
  }

  if (!payload || payload.length === 0) {
    return null;
  }

  // Extract the actual time value from the payload data
  let timeValue: number | null = null;
  let labelText = "";

  if (payload && payload.length > 0 && payload[0].payload) {
    // Get the time from the data point
    const dataPoint = payload[0].payload;
    if (typeof dataPoint.time === "number") {
      timeValue = dataPoint.time;
      labelText = utcTimeToIsoDateTimeString(timeValue);
    } else if (typeof dataPoint.timeLabel === "string") {
      labelText = dataPoint.timeLabel;
    }
  }

  // Fallback to label if we couldn't extract time
  if (!labelText) {
    if (typeof label === "string") {
      labelText = label;
    } else if (isNumber(label) && label !== null) {  // FIXED: Added explicit null check
      labelText = utcTimeToIsoDateTimeString(label as number);  // FIXED: Type assertion
    } else {
      labelText = String(label);
    }
  }

  const items = payload.map(
    (p: TooltipPayload<number, string>, index: number) => {
      const { name, value, unit, dataKey } = p;
      let color = p.color;
      if (!isNumber(value)) {
        return null;
      }

      const nameText = name || "?";
      const valueText = value.toFixed(3);
      if (color === INVISIBLE_LINE_COLOR) {
        color = SUBSTITUTE_LABEL_COLOR;
      }
      const isPoint = nameText.indexOf(":") !== -1;
      let suffixText = isPoint ? "" : ` (${dataKey})`;
      if (typeof unit === "string") {
        if (suffixText !== "") {
          suffixText = `${unit} ${suffixText}`;
        } else {
          suffixText = unit;
        }
      }
      return (
        <div key={index}>
          <span>{nameText}:&nbsp;</span>
          <Box component="span" sx={styles.toolTipValue} style={{ color }}>
            {valueText}
          </Box>
          <span>&nbsp;{suffixText}</span>
        </div>
      );
    },
  );

  if (!items || items.every(item => item === null)) {
    return null;
  }

  return (
    <Box sx={styles.toolTipContainer}>
      <Box component="span" sx={styles.toolTipLabel}>
        {labelText} {timeValue ? "UTC" : ""}
      </Box>
      {items}
    </Box>
  );
}