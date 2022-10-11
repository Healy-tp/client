

const getRangesWhenOnlyOne = (availabilities, ranges) => {
  if (availabilities[0].startHour === 8) {
    ranges.push(`${availabilities[0].endHour}-20`);
    return ranges;
  } 
  
  if (availabilities[0].startHour === 20) {
    ranges.push(`8-${availabilities[0].startHour}`);
    return ranges
  } 
  ranges.push(`8-${availabilities[0].startHour}`);
  ranges.push(`${availabilities[0].endHour}-20`);
  return ranges;
}

const getRangesWhenMoreThanOne = (availabilities, ranges) => {
  const first = availabilities[0].startHour === 8 ? `${availabilities[0].endHour}-${availabilities[1].startHour}` : `8-${availabilities[0].startHour}`;
    let idx = availabilities[0].startHour === 8 ? 1 : 0;
    ranges.push(first)
    while (idx <= availabilities.length - 1) {
      if (!availabilities[idx+1]) {
        ranges.push(`${availabilities[idx].endHour}-20`);
      } else {
        ranges.push(`${availabilities[idx].endHour}-${availabilities[idx+1].startHour}`);
      }
      idx++;
    }
    return ranges;
}

const getAvailabilityRanges = (availabilities) => {
  let ranges = []
  if (availabilities.length === 1) {
    ranges = getRangesWhenOnlyOne(availabilities, ranges);
  } else if (availabilities.length === 0) {
    ranges.push('8-20');
  } else {
    ranges = getRangesWhenMoreThanOne(availabilities, ranges);
  }
 
  return ranges;
}

export {
  getAvailabilityRanges,
}
